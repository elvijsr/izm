const Router = require("koa-router");
const router = new Router();
const pgp = require("pg-promise")();

// Database connection details
console.log(process.env.DB_HOST);
const connection = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

// Create the database instance
const db = pgp(connection);

// New endpoint to retrieve data from the 'your_table' table
router.get("/schools", async (ctx, next) => {
  try {
    const result = await db.any("SELECT * FROM school");
    ctx.body = { data: result };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: "Error retrieving data from the database" };
  }
});

module.exports = router;
