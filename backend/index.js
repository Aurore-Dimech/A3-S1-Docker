import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const app = express();

dotenv.config();

pool.on("connect", () => {
  console.log("Connected to the database");
});

pool.on("error", (error) => {
  console.error("Error connecting to the database", error);
});

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello!");
})

app.get("/create-table", (req, res) => {
  const query = `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
  )`;

  pool.query
    (query, (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send("Table created successfully");
    });
});

app.get("/add-user", (req, res) => {
  const query = `INSERT INTO users (name, email) VALUES ('John Doe', 'johndoe@email.fr')`;

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).send("User added successfully");
  });
  
  }
);

app.get("/api", (req, res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// const logger = require('./logger');

// logger.info("L'application à été rediriger vers le syslog");