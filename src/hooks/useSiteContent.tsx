import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SiteContentItem {
  section: string;
  key: string;
  value: string;
}

export function useSiteContent(section?: string) {
  return useQuery({
    queryKey: ["site_content", section],
    queryFn: async () => {
      let query = supabase.from("site_content").select("*");
      if (section) query = query.eq("section", section);
      const { data, error } = await query;
      if (error) throw error;
      return data as SiteContentItem[];
    },
  });
}

export function useContentValue(section: string, key: string, fallback: string) {
  const { data } = useSiteContent(section);
  const item = data?.find((d) => d.key === key);
  return item?.value ?? fallback;
}

export function useUpsertContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: SiteContentItem) => {
      const { error } = await supabase
        .from("site_content")
        .upsert(
          { section: item.section, key: item.key, value: item.value },
          { onConflict: "section,key" }
        );
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["site_content"] }),
  });
}

export function useSiteImages(section?: string) {
  return useQuery({
    queryKey: ["site_images", section],
    queryFn: async () => {
      let query = supabase.from("site_images").select("*");
      if (section) query = query.eq("section", section);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useImageValue(section: string, key: string, fallback: string) {
  const { data } = useSiteImages(section);
  const item = data?.find((d: any) => d.key === key);
  return item?.image_url ?? fallback;
}

export function useUpsertImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ section, key, file }: { section: string; key: string; file: File }) => {
      const filePath = `${section}/${key}-${Date.now()}.${file.name.split(".").pop()}`;
      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("site-images")
        .getPublicUrl(filePath);

      const { error } = await supabase
        .from("site_images")
        .upsert(
          { section, key, image_url: urlData.publicUrl },
          { onConflict: "section,key" }
        );
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["site_images"] }),
  });
}
