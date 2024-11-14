<?php

namespace Modules\Sales\Listeners;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Modules\Sales\Events\SaleCreated;

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
        $sales = $event->sales->load('details.product');
        $pdf = Pdf::loadView('sales::invoices.sales', ['sales' => $sales]);
        $pdfContent = $pdf->output();
        Log::info($pdfContent);
        Storage::disk('public')->put("invoices/sales/{$sales->reference}.pdf", $pdfContent);
    }
}
