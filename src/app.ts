import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import { connectDB } from "./config/db";
import { swaggerSpec } from "./config/swagger";
import { errorMiddleware } from "./middlewares/error.middleware";
import userRoutes from "./routes/user.routes";

export const createApp = async (): Promise<Application> => {
  await connectDB();

  const app: Application = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api/users", userRoutes);

  app.use(errorMiddleware);

  return app;
};
