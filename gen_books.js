const { Pool } = require("pg");
const format = require("pg-format");
const faker = require("faker");

const db = new Pool({
  host: "172.17.0.1", // postgres host
  database: "postgres",
  password: "passwd",
  user: "postgres",
});

async function main() {
  let books = [];

  for (let i = 1; i <= 100000; i++) {
    books[i - 1] = [
      faker.commerce.productName(),
      faker.commerce.productDescription(),
      faker.commerce.price(),
    ];
  }

  const query = format(
    "INSERT INTO books (title, description, price) VALUES %L",
    books
  );

  try {
    await db.query(query);
    console.log("Done!");
  } catch (error) {
    console.error(error);
  }
}

main();
