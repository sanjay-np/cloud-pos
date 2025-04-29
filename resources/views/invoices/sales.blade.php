<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style>
        @page {
            margin: 50px 20px;
        }

        body {
            font-family: Arial, sans-serif;
            color: #333;
            line-height: 0.5em;
            margin-bottom: 0;
            font-size: 14px;
            padding: 0;
            margin: 0;
        }

        .invoice-container {
            margin: auto;
        }

        .invoice-header {
            margin-bottom: 20px;
        }

        .invoice-header h1 {
            margin: 0;
            font-size: 24px;
            text-align: right;
        }

        .item-table {
            clear: both;
            width: 100%;
            border-collapse: collapse;
            margin-top: 50px;
            padding-top: 30px;
            margin-bottom: 30px;
        }

        .item-table th,
        .item-table td {
            border: 1px solid #ddd;
            padding: 15px 10px;
            text-align: left;
            margin-bottom: 0;
        }

        .item-table th {
            background-color: #f3f3f3;
        }

        .total {
            text-align: right;
            font-weight: bold;
            margin-bottom: 15px;
            padding-right: 10px;
        }
    </style>
</head>

<body>
    <div class="invoice-container">
        <div class="invoice-header">
            <h1>Sales Invoice</h1>
            <p>Invoice Number: {{ $sales->reference }}</p>
            <p>Date: {{ $sales->date }}</p>
        </div>

        <!-- Client and Company Details -->
        <div class="client-details">
            <div style="width: 60%; float: left;">
                <h3>From:</h3>
                <p>Chaudhary Gas Suppliers</p>
                <p>Butwal-11, RangaShala Road</p>
                <p>Rupandehi, Nepal</p>
                <p>Email: <a href="mailto:sanjayc2051@gmail.com">sanjayc2051@gmail.com</a></p>
            </div>
            <div style="width: 30%; float: right;">
                <h3>Bill To:</h3>
                <p>{{ $sales->customer->name }}</p>
                <p style="line-height: 1.5;">{{ $sales->customer->address }}</p>
                <p>Phone: {{ $sales->customer->phone }}</p>
            </div>
        </div>

        <!-- Itemized Charges -->
        <table class="item-table">
            <tr>
                <th>Item</th>
                <th style="width: 50px;">Qty</th>
                <th style="width: 80px;">Price</th>
                <th style="width: 80px">Amt</th>
            </tr>
            @php
                $subTotal = 0;
            @endphp
            @foreach ($sales->details as $detail)
                <tr>
                    <td>{{ $detail->product->title }}</td>
                    <td>{{ $detail->qty }}</td>
                    <td>{{ $detail->price }}</td>
                    <td>{{ $detail->sub_total }}</td>
                </tr>
                @php
                    $subTotal += $detail->sub_total;
                @endphp
            @endforeach
        </table>

        <!-- Total Amount -->
        <p class="total">Sub Total: {{ $subTotal }}</p>
        <p class="total">Tax Total: {{ $sales->tax_amount }}</p>
        <p class="total">Discount Total: {{ $sales->discount_amount }}</p>
        <p class="total"> Total: {{ $sales->total_amount }}</p>
        <p class="total"> Paid Amount: {{ $sales->paid_amount }}</p>
        <p class="total"> Due Amount: {{ $sales->due_amount }}</p>
    </div>
</body>

</html>
