import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "book_store",
});

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/books", (req, res) => {
  const sqlQuery = "SELECT * FROM books";
  db.query(sqlQuery, (error, data) => {
    if (error)
      return res.status(500).json({ message: "Internal Server Error!", error });
    return res.status(200).json(data);
  });
});

app.post("/books", (req, res) => {
  const sqlQuery =
    "INSERT INTO books(`title`,`desc`,`cover`,`price`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];

  db.query(sqlQuery, [values], (error, data) => {
    if (error)
      return res.status(500).json({ message: "Internal Server Error!", error });
    return res.status(200).json({ message: "Book added successfully!", data });
  });
});

app.delete("/books/:id", (req, res) => {
  const bookID = req.params.id;
  const sqlQuery = "DELETE FROM books WHERE id = ?";
  db.query(sqlQuery, [bookID], (error, data) => {
    if (error) {
      console.error("Error deleting book:", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
    return res.status(200).json({ message: "Book Deleted Successfully!" });
  });
});

// app.put("/books/:id", (req, res) => {
//   const values = [
//     req.body.title,
//     req.body.desc,
//     req.body.cover,
//     req.body.price,
//   ];
//   const bookID = req.params.id;
//   const sqlQuery =
//   "UPDATE book SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
//   db.query(sqlQuery, [...values, bookID], (error, data) => {
//     if (error)
//       return res.status(500).json({ message: "Internal Server Error" });
//     return res.status(200).json({ message: "Book Updated Succesfully", data });
//   });
// });

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(PORT, () => {
  console.log("Server started at http://localhost:8080/");
});
