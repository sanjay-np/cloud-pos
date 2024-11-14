<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            line-height: 0.5em;
            margin-bottom: 0;
            font-size: 14px;
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

        }

        .client-details div {
            width: 50%;
            float: left;
        }

        .item-table {
            clear: both;
            width: 100%;
            border-collapse: collapse;
            margin-top: 50px;
            padding-top: 30px;
        }

        .item-table th,
        .item-table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }

        .item-table th {
            background-color: #f4f4f4;
        }

        .total {
            text-align: right;
            font-weight: bold;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="invoice-container">
        <div class="invoice-header">
            <h1>Sales Invoice</h1>
            <p>Invoice Number: #12345</p>
            <p>Date: 2023-10-01</p>
        </div>

        <!-- Client and Company Details -->
        <div class="client-details">
            <div>
                <h3>From:</h3>
                <p>Chaudhary Gas Suppliers</p>
                <p>Butwal-11, RangaShala Road</p>
                <p>Rupandehi, Nepal</p>
                <p>Email: <a href="mailto:sanjayc2051@gmail.com">sanjayc2051@gmail.com</a></p>
            </div>
            <div>
                <h3>Bill To:</h3>
                <p>Sanjay Chaudhary</p>
                <p>Butwal-11, RangaShala Road</p>
                <p>Rupandehi, Nepal</p>
                <p>Phone: +977-1-1234567</p>
            </div>
        </div>

        <!-- Itemized Charges -->
        <table class="item-table">
            <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
            </tr>
            <tr>
                <td>Item 1</td>
                <td>2</td>
                <td>$50.00</td>
                <td>$100.00</td>
            </tr>
            <tr>
                <td>Item 2</td>
                <td>1</td>
                <td>$200.00</td>
                <td>$200.00</td>
            </tr>
            <tr>
                <td>Service Fee</td>
                <td>1</td>
                <td>$75.00</td>
                <td>$75.00</td>
            </tr>
        </table>

        <!-- Total Amount -->
        <p class="total">Total: $375.00</p>
    </div>
</body>

</html>