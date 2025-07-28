import { createApp } from "./app";
import { config } from "./config";
import { logger } from "./utils/logger";

const startServer = async (): Promise<void> => {
  try {
    const app = await createApp();
    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
      console.log(
        `Swagger docs available at http://localhost:${config.port}/api-docs`
      );
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
