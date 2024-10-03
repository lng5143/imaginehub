import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const uploadFileAndGetUrl = async (bucketName, path, file) => {
    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(path, file, {
            contentType: file.type
        })
        
    if (error)
        return { error: error.message }

    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${data.path}`
}

export default supabase;