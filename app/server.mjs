import https from "https";
import path from "path";
import fs from "fs";
import { createServer } from "http";
import express from "express";
import cookieParser from "cookie-parser";
import sequelize from "./backend/db/sequelize.mjs";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./backend/swagger.mjs";

// Create app
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

const privateKey = fs.readFileSync(path.resolve("privkey.key"), "utf8");
// Import SSL certificate
const sslcert = {
  key: privateKey,
  cert: fs.readFileSync(path.resolve("cerificate.crt"), "utf8"),
};

// Import routes
import userRoute from "./backend/routes/user.mjs";
import bookRoute from "./backend/routes/book.mjs";
import categoryRoute from "./backend/routes/category.mjs";
import authorRoute from "./backend/routes/author.mjs";
import editorRoute from "./backend/routes/editor.mjs";
// Routes
app.use("/user", userRoute);
app.use("/book", bookRoute);
app.use("/category", categoryRoute);
app.use("/author", authorRoute);
app.use("/editor", editorRoute);

const httpsServer = https.createServer(sslcert, app);

httpsServer.listen(8080, () => {
  console.log("Server running on port https://localhost:8080");
});
export { privateKey };
