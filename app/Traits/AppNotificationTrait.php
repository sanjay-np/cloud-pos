<?php

namespace App\Traits;

use App\Notifications\SlackNotification;
use Illuminate\Support\Facades\Notification;

trait AppNotificationTrait
{
    public function sendSlackNotification($message)
    {
        Notification::route('slack', env('SLACK_WEBHOOK_URL'))
            ->notify(new SlackNotification($message));
    }
}
