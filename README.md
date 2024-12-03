# CGS-ERP: Business Management System

A comprehensive Enterprise Resource Planning (ERP) system designed for small vendors to manage their business operations efficiently.

![Screen Shot 2024-12-03 at 7 41 02 PM](https://github.com/user-attachments/assets/29a81269-6e6e-40c1-84e0-26b772c60dc2)


## Features

### Inventory Management
- Product tracking and categorization
- Stock level monitoring
- Low stock alerts
- Barcode/SKU management

### Sales Management
- Point of Sale (POS) system
- Invoice generation
- Sales reports and analytics
- Customer order tracking

### Purchase Management
- Supplier management
- Purchase order creation
- Stock receiving
- Purchase history tracking

### Financial Management
- Expense tracking
- Revenue monitoring
- Basic accounting features
- Financial reports generation

### Customer Management
- Customer database
- Purchase history
- Contact information
- Customer feedback tracking

### Employee Management
- Employee profiles
- Attendance tracking
- Role management
- Performance monitoring

### Reporting
- Sales analytics
- Inventory reports
- Financial statements
- Custom report generation

## Technical Requirements

- Laravel
- MySQL
- React.js
- Tailwind CSS
- PHP

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sanjay-np/cgs-erp.git
cd cgs-erp
```

2. Install dependencies:
```bash
composer install
npm install
```

3. Set up environment variables:
Copy .env.example to `.env` file in the root directory and add necessary configurations:

4. Start the development server:
```bash
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve
npm run dev
```

## Usage

1. Access the application through your web browser at `http://localhost:8000`
2. Log in with your credentials
3. Navigate through different modules using the sidebar menu
4. Start managing your business operations

## Admin Credentials
    Email: `test@test.com`
    Password: `password`
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support
For support, open an issue in the GitHub repository.
