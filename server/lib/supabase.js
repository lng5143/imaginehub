import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export const uploadFileToSupabaseAndGetUrl = async (bucketName, path, file) => {
    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(path, file, {
            contentType: file.type
        })
        
    if (error)
        return { error: error.message }

    return `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucketName}/${data.path}`
}

export default supabase;