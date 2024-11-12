<?php

namespace Modules\Sales\Listeners;

use Modules\Sales\app\Events\SaleCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifySaleCreated
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(SaleCreated $event): void
    {
        //
    }
}
