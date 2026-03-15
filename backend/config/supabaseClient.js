import { createClient } from "@supabase/supabase-js/dist/index.cjs";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export default supabase;