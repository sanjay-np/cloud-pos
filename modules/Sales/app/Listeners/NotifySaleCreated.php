<?php

namespace Modules\Sales\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Modules\Sales\Events\SaleCreated;
use Spatie\LaravelPdf\Facades\Pdf;

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
        $sale = $event->sale;
        Pdf::view('invoices.sale', compact('sale'))->format('a4')->save('pdf/' . $sale->reference . '.pdf');
    }
}
