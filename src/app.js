const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const logger = require("morgan");
// require("./config/db.config").dbConnect();
require("dotenv").config();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 2500, // limit each IP to 2500 requests per windowMs
});
app.use(limiter);

// Enable CORS for all routes
app.use(
  cors({
    origin: "https://accredian-refer-n-earn.vercel.app",
    methods: "GET,POST,PATCH,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization,auth-token",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));

//middleware
app.use(express.json());

app.use(
  bodyParser.text({
    limit: "50mb",
  })
);

app.use(
  bodyParser.raw({
    limit: "50mb",
  })
);

// Json parser
app.use(
  bodyParser.json({
    limit: "50mb",
    parameterLimit: 100000,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 100000,
  })
);

app.use("/api", require("./router/index"));

app.use((req, res, next) => {
  return res.status(404).json({ message: "404 Not Found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
