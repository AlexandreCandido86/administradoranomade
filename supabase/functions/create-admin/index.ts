import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Create the user
  const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email: "soulumbrasil@gmail.com",
    password: "admin1234@",
    email_confirm: true,
  });

  if (createError) {
    // User might already exist
    if (createError.message.includes("already")) {
      // Get existing user
      const { data: { users } } = await supabaseAdmin.auth.admin.listUsers();
      const existing = users?.find((u: any) => u.email === "soulumbrasil@gmail.com");
      if (existing) {
        // Assign admin role
        const { error: roleError } = await supabaseAdmin
          .from("user_roles")
          .upsert({ user_id: existing.id, role: "admin" }, { onConflict: "user_id,role" });
        return new Response(JSON.stringify({ success: true, message: "Role assigned to existing user", roleError }));
      }
    }
    return new Response(JSON.stringify({ error: createError.message }), { status: 400 });
  }

  // Assign admin role
  const { error: roleError } = await supabaseAdmin
    .from("user_roles")
    .upsert({ user_id: userData.user.id, role: "admin" }, { onConflict: "user_id,role" });

  return new Response(JSON.stringify({ success: true, userId: userData.user.id, roleError }));
});
