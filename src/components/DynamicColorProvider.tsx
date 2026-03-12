import { useEffect } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";

const colorKeyToCssVar: Record<string, string> = {
  primary: "--primary",
  background: "--background",
  card: "--card",
  foreground: "--foreground",
  muted_foreground: "--muted-foreground",
  accent: "--accent",
  border: "--border",
};

export function DynamicColorProvider({ children }: { children: React.ReactNode }) {
  const { data: contentData } = useSiteContent("colors");

  useEffect(() => {
    if (!contentData || contentData.length === 0) return;
    const root = document.documentElement;
    contentData.forEach((item) => {
      const cssVar = colorKeyToCssVar[item.key];
      if (cssVar && item.value) {
        root.style.setProperty(cssVar, item.value);
      }
    });

    return () => {
      // Clean up on unmount
      Object.values(colorKeyToCssVar).forEach((cssVar) => {
        root.style.removeProperty(cssVar);
      });
    };
  }, [contentData]);

  return <>{children}</>;
}
