<?php

namespace App\Services;

use App\Models\SlackNotify;
use App\Notifications\SlackNotification;

class NotificationService
{
    public function __construct(private SlackNotify $slack) {}

    public function sendSlackNotification(string $message,)
    {
        $url = config('app.url');
        $this->slack->notify(
            new SlackNotification("{$url}->{$message}")
        );
    }
}
