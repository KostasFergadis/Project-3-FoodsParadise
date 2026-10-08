import express from "express";
import connectToDb from "./utils/db.js";
import logger from "./middleware/logger.js";
import fallback from "./middleware/fallback.js";
import errorHandler from "./middleware/errorhandler.js";
import router from "./router.js";
import cors from "cors";
import helmet from "helmet";
import { CORS_ORIGINS, PORT } from "./consts.js";
import { apiLimiter } from "./middleware/rateLimit.js";

const app = express();

app.use(helmet());
app.use(cors(CORS_ORIGINS.length ? { origin: CORS_ORIGINS } : undefined));
app.use(apiLimiter);
app.use(express.json({ limit: "100kb" }));
app.use(logger);
app.use(router);
app.use(fallback);
app.use(errorHandler);

const startServer = async () => {
  await connectToDb();
  app.listen(PORT, () => {
    console.log(`server is working on ${PORT}`);
  });
};

startServer();
