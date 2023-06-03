const Koa = require("koa");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const testRoute = require("./routes/test");
require("dotenv").config();

const app = new Koa();

// Middleware
app.use(cors());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(testRoute.routes());

// Server
const PORT = process.env.PORT || 54678;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
