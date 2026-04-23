import { supabase } from "./supabase"

export async function getMostRecentDate() {
    const { data } = await supabase
    .from('pdfs')
    .select('date')
    .order('date', { ascending: false })
    .limit(1)

    const result = data?.[0].date ?? "1970/12/31"
    return result.replaceAll("-", "/")
}

export const oldestDate = "2026/02/15" as const  // should stay constant

