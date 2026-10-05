# Books REST API — Task 3

Simple Node.js + Express REST API for CRUD operations on books.

## Run

```bash
npm install
npm start
```

Server: `http://localhost:3000`

Development mode:

```bash
npm run dev
```

## Postman tests

### GET all books
`GET http://localhost:3000/books`

### GET one book
`GET http://localhost:3000/books/1`

### POST a book
`POST http://localhost:3000/books`

Body → raw → JSON:

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin"
}
```

### PUT a book
`PUT http://localhost:3000/books/1`

```json
{
  "title": "Things Fall Apart - Updated",
  "author": "Chinua Achebe"
}
```

### DELETE a book
`DELETE http://localhost:3000/books/1`

Books are stored in memory, so changes disappear when the server restarts.
