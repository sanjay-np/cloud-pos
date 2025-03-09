<?php

namespace App\Listeners;

use App\Events\SaleCreated;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Storage;

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
        Storage::disk('public')->put("invoices/sales/{$sales->reference}.pdf", $pdfContent);
    }
}
