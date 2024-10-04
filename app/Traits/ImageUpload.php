<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait ImageUpload
{
    /**
     * Store an image in a given path.
     *
     * @param  mixed  $image
     * @param  string  $path
     * @return mixed
     */
    public function uploadImage($image, $path): mixed
    {
        if (!$image) {
            return null;
        }
        $image_path = $image->storeAs($path, Str::uuid() . '.' . $image->getClientOriginalExtension(), 'public');
        return $image_path;
    }

    /**
     * Store multiple images in a given path.
     *
     * @param  array  $images
     * @param  string  $file_path
     * @return array
     */
    public function uploadMultipleImages($images, $file_path): array
    {
        if (!$images) {
            return null;
        }
        $image_paths = [];
        foreach ($images as $image) {
            $image_paths[] = $this->uploadImage($image, $file_path);
        }
        return $image_paths;
    }
}
