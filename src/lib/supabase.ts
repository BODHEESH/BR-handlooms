import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface UploadResult {
  url: string
  path: string
  error?: string
}

// Upload image to Supabase storage
export async function uploadImage(
  file: File,
  bucket: string = 'product-images',
  folder: string = 'products'
): Promise<UploadResult> {
  try {
    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split('.').pop()
    const fileName = `${folder}/${timestamp}-${randomString}.${extension}`

    // Upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      throw error
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return {
      url: publicUrl,
      path: data.path
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    return {
      url: '',
      path: '',
      error: error instanceof Error ? error.message : 'Failed to upload image'
    }
  }
}

// Delete image from Supabase storage
export async function deleteImage(
  path: string,
  bucket: string = 'product-images'
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) {
      throw error
    }

    return { success: true }
  } catch (error) {
    console.error('Error deleting image:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete image'
    }
  }
}

// Get public URL for an image
export function getImageUrl(
  path: string,
  bucket: string = 'product-images'
): string {
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)

  return publicUrl
}
