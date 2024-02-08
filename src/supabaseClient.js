import { createClient } from '@supabase/supabase-js';

// To be more secure: .env file. 
const supabaseURL = "https://mgcpumbdpdxcvqjtoyee.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nY3B1bWJkcGR4Y3ZxanRveWVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0MTE0MzAsImV4cCI6MjAyMjk4NzQzMH0.2gT_Wl-zoTSYUyTkvWcAXzvOo35Dx-2kC3Zdr0pfCgc";

export const supabase = createClient(supabaseURL, supabaseAnonKey);