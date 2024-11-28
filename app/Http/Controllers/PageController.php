<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\SlackNotification;
use App\Services\DashboardService;
use App\Traits\AppNotificationTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    use AppNotificationTrait;

    public function index(DashboardService $service)
    {
        $items = $service->index();
        return Inertia::render('Dashboard', compact('items'));
    }

    public function slack()
    {
        $user = User::find(1);
        $user->notify(new SlackNotification('Slack Notification from controller'));
        // $this->sendSlackNotification('Slack Notification');
    }
}
