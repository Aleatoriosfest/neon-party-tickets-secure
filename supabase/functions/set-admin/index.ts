
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create supabase client with service role key (required for admin operations)
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // First, find the user in auth.users by email
    const { data: users, error: getUserError } = await supabase.auth.admin.listUsers();

    if (getUserError) {
      throw new Error(`Error fetching users: ${getUserError.message}`);
    }

    const user = users.users.find(u => u.email === email);

    if (!user) {
      return new Response(
        JSON.stringify({ error: `User with email ${email} not found` }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Update the user role in the usuarios table
    const { error: updateError } = await supabase
      .from('usuarios')
      .update({ role: 'admin' })
      .eq('id', user.id);

    if (updateError) {
      throw new Error(`Error updating user role: ${updateError.message}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: `User ${email} set as admin` }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
