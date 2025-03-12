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
import searchRoute from "./backend/routes/search.mjs";
// Routes
app.use("/api/user", userRoute);
app.use("/api/book", bookRoute);
app.use("/api/category", categoryRoute);
app.use("/api/author", authorRoute);
app.use("/api/editor", editorRoute);
app.use("/api/search", searchRoute);

const httpsServer = https.createServer(sslcert, app);

httpsServer.listen(443, () => {
  console.log("Server running on port https://localhost:443");
});
export { privateKey };
