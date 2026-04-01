import { createClient } from '@supabase/supabase-js'

// These env vars must be set in your .env (local) and Vercel project settings.
// VITE_SUPABASE_URL  — your Supabase project URL, e.g. https://xxxx.supabase.co
// VITE_SUPABASE_ANON_KEY — your Supabase project anon/public key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

/**
 * Upload a product image to Supabase Storage.
 *
 * Prerequisites (one-time setup in Supabase dashboard):
 *   1. Create a Storage bucket named "product-images".
 *   2. Set the bucket to Public so images can be read without auth.
 *   3. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your
 *      .env file and Vercel environment variables.
 *
 * @param {File} file - The image File object from an <input type="file">.
 * @returns {Promise<string>} The public URL of the uploaded image.
 */
export async function uploadProductImage(file) {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.'
    )
  }

  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file, { cacheControl: '3600', upsert: false })

  if (error) throw new Error(`Image upload failed: ${error.message}`)

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName)

  return data.publicUrl
}
