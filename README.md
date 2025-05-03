
# 🌐 Cloud POS

**Cloud POS** is a modern Point of Sale (POS) application designed for small to medium-sized businesses. Built with a powerful tech stack—**Laravel** for the backend and **React.js** for the frontend—this project uses **Inertia.js** to deliver a seamless single-page app (SPA) experience.
---
![Screenshot 2025-05-03 at 8 19 01 AM](https://github.com/user-attachments/assets/9efef63a-3d17-4ba4-858a-2206155f0f79)


---

## ✨ Key Features

- 👥 **Customer Management**  
  Easily add, view, and update customer records.

- 🧑‍💼 **Employee Management**  
  Manage staff profiles, roles, and permissions.

- 💰 **Sales Management**  
  Track and manage sales transactions in real-time.

- 📥 **Purchase Management**  
  Keep records of product purchases from suppliers.

- 🛒 **Product Management**  
  Add and update product details, including pricing and stock.

- 🏷️ **Brand & Supplier Management**  
  Categorize products by brand and associate them with suppliers.

- 📚 **Attributes & Categories**  
  Organize inventory with flexible attribute and category systems.

---

## 🛠 Tech Stack

| Layer        | Technology    |
|--------------|---------------|
| **Backend**  | Laravel        |
| **Frontend** | React.js       |
| **SPA**      | Inertia.js     |
| **Database** | MySQL (or compatible) |

---

## ⚙️ Installation Guide

> **Requirements**: PHP, Composer, Node.js, MySQL (or similar)

### 1. Clone the Repository

```bash
git clone https://github.com/sanjay-np/cloud-pos.git
cd cloud-pos

```

### 2. Backend Setup

```bash 
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed

```

### 3. Frontend Setup

``` bash
npm install
npm run dev

```

### 4. Run the Application

``` bash
php artisan serve
```

Access your app at: http://localhost:8000


### 🤝 Contributing

Contributions are welcome! If you'd like to suggest a feature or fix a bug, please open an issue or submit a pull request.
