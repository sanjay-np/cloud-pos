<?php

namespace App\Helpers;

class Helpers
{
    public static function makeReferenceId($prefix, $number)
    {
        $padded_text = $prefix . '-' . str_pad($number, 5, 0, STR_PAD_LEFT);
        return $padded_text;
    }

    public static function formatNumber($number)
    {
        return number_format($number, 2, '.', ',');
    }
}
