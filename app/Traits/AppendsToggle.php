<?php

namespace App\Traits;

trait AppendsToggle
{
    /**
     * @var array|bool
     */
    public static $disabledAppends = false;

    /**
     * Filter the appendable attributes based on disabled settings.
     *
     * @return array
     */
    protected function getArrayableAppends()
    {
        $appends = parent::getArrayableAppends();

        // If disabled completely, return empty array
        if (self::$disabledAppends === true) {
            return [];
        }

        // If specific keys are disabled, filter them out
        if (is_array(self::$disabledAppends) && !empty(self::$disabledAppends)) {
            return array_diff($appends, self::$disabledAppends);
        }

        // Otherwise return all appends
        return $appends;
    }
}
