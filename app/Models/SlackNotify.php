<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class SlackNotify extends Model
{
    use Notifiable;

    public function routeNtificationForSlack()
    {
        return config('services.slack.notifications.webhook_url');
    }
}
