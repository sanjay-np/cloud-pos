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

        if (self::$disabledAppends === true) {
            return [];
        }

        if (is_array(self::$disabledAppends) && !empty(self::$disabledAppends)) {
            return array_diff($appends, self::$disabledAppends);
        }

        return $appends;
    }
}
