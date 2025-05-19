## Nodejs with Prisma

Create your `.env` file and add your database URL:

```env
DATABASE_URL="your_database_url"
```

This is a simple API built with Node.js using Prisma and PostgreSQL. It includes two main models: **Category** and **Product**. The API implements validation to prevent unnecessary requests. Each request is validated before data is persisted.

- Categories support full CRUD operations.
- Products, which belong to categories, also support CRUD operations.

This structure ensures organized data management and enforces relationships between products and categories.
