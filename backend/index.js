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
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello!");
})

app.get("/create-table", (req, res) => {
  const query = `CREATE TABLE IF NOT EXISTS animals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(100)
  )`;

  pool.query
    (query, (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send("Table created successfully");
    });
});


app.get("/api", (req, res) => {
  pool.query("SELECT * FROM animals", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

app.post("/add-animal", (req, res) => {
  const animalName = req.body.setName
  const animalType = req.body.setType

  const query = `INSERT INTO animals (name, type) VALUES ($1, $2)`;

  pool.query(query, [animalName, animalType], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).json({ message: "Animal added successfully" }); // Send JSON response
  });
  
  }
);

app.delete("/delete-animal/:id", (req, res) => {
  const animalId = req.params.id

  const query = `DELETE FROM animals WHERE id=$1`;

  pool.query(query, [animalId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).json({ message: "Animal deleted successfully" });
  });
  
  }
);

app.put("/update-animal/:id", (req, res) => {
  const animalId = req.params.id;
  const { setName, setType } = req.body;

  const query = `UPDATE animals SET name = $1, type = $2 WHERE id = $3`;

  pool.query(query, [setName, setType, animalId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json({ message: "Animal updated successfully" });
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});