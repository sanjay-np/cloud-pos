<?php

namespace App\Traits;

trait ImageUpload
{
    public function uploadImage($image, $path): mixed
    {
        if (!$image) {
            return null;
        }
        $image_path = $image->storeAs($path, now()->timestamp . '.' . $image->getClientOriginalExtension(), 'public');
        return $image_path;
    }

    public function uploadMultipleImages($images, $file_path): array
    {
        if (!$images) {
            return [];
        }
        $image_paths = [];
        foreach ($images as $image) {
            $image_paths[] = $this->uploadImage($image, $file_path);
        }
        return $image_paths;
    }
}
