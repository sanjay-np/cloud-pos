<?php

if (!function_exists('make_reference_id')) {
    function make_reference_id($prefix, $number)
    {
        $padded_text = $prefix . '-' . str_pad($number, 5, 0, STR_PAD_LEFT);
        return $padded_text;
    }
}

if (!function_exists('format_number')) {
    function format_number($number)
    {
        return number_format($number, 2, '.', ',');
    }
}
