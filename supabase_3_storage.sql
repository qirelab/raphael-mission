-- STEP 3: Setup Storage for Images
-- Run this after steps 1 and 2

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('raphael-mission-images', 'raphael-mission-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to images
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
USING (bucket_id = 'raphael-mission-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'raphael-mission-images' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'raphael-mission-images' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'raphael-mission-images' 
  AND auth.role() = 'authenticated'
);

