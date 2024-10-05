# E-Commerce Application

This project is a full-stack e-commerce web application built using **Spring Boot** for the backend and **React** for the frontend. Users can search for products by category, search using keywords, sign up, log in, and add items to their cart.

## Features

- **User Authentication**: Sign up and log in functionality with session management.
- **Product Search by Category**: Browse products by selecting categories.
- **Keyword-based Search**: Search for products using keywords.
- **Cart Management**: Add products to the shopping cart and view them.
  
## Technologies Used

### Backend
- **Spring Boot**: REST API to manage products, users, and carts.
- **Spring Security**: For authentication and authorization.
- **Spring Data JPA**: For interacting with the database.
- **MySQL/PostgreSQL**: Database for storing user and product data.

### Frontend
- **React.js**: Frontend framework for building the user interface.
- **Axios**: For making HTTP requests from React to Spring Boot API.
- **React Router**: For navigation between pages.

### Other
- **JWT (JSON Web Token)**: For securing the application and managing user sessions.
- **Maven**: Build and dependency management tool for the backend.

## Installation and Setup

### Prerequisites
- Java 17 or higher
- Node.js & npm
- MySQL
- Maven

### Backend Setup (Spring Boot)

1. Clone the repository:
   ```bash
    git clone https://github.com/your-username/ecommerce-spring-react.git
    cd ecommerce-spring-react/backend
   ```
2. Install Maven dependencies:

    ```bash
        Copy code
        mvn clean install
    ``
3. Configure your database connection in application.properties:

    ```bash
        spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
        spring.datasource.username=your-username
        spring.datasource.password=your-password
        spring.jpa.hibernate.ddl-auto=update
    ```
4. Run the backend server:

    ```bash

        mvn spring-boot:run
    ```
### Frontend Setup (React)

1.Navigate to the frontend directory:

    ```bash

        cd ../frontend
    ```
2. Install the dependencies:

    ```bash

        npm install
    ```
    3.Start the development server:

    ```bash

        npm run dev
    ```
### Environment Variables
  1.create a .env file and add the following:

  ```bash
    
        VITE_BACKEND_URL=http://localhost:8080
  ```

### API Endpoints
1.Authentication
        POST /signup: Register a new user.
        POST /login: Authenticate and log in the user.
    2.Products
        GET /api/products: Get all products.
        GET /api/products/category: Get products by category(e.g., ?q=keyword).
        GET /api/products/search: Search products by keyword (e.g., ?q=keyword).
    3.Cart
        POST /api/cart: Add an item to the cart.
        GET /api/cart: Get cart items for the logged-in user.
        DELETE /api/cart/:id : Delete item from the cart 
        PUT /api/cart/:id : Update the quantity of the product
    4.Usage
        Sign up or log in to access product search and cart features.
        Use the search bar to search for products by keyword or filter products by categories.
        Add products to your cart and view the items from the cart page.
        
###  Future Enhancements
  Product reviews and ratings.
  Wishlist functionality.
