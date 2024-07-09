import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

export const supabase = createClient(env.URL_SUPABASE, env.PUBLIC_KEY_SUPABASE)