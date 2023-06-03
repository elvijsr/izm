require("dotenv").config();
const Koa = require("koa");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const testRoute = require("./routes/test");
const schoolRoute = require("./routes/schools");

const app = new Koa();

// Middleware
app.use(cors());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(testRoute.routes());
app.use(schoolRoute.routes());

// Server
const PORT = process.env.PORT || 54678;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
