import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";

const startServer = async () => {
  try {
    await connectDatabase();

    const server = app.listen(
      env.port,
      () => {
        console.log(
          `Server running on port ${env.port}`
        );
      }
    );

    const shutdown = (signal) => {
      console.log(
        `${signal} received. Shutting down server...`
      );

      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error(
      "Failed to start server:",
      error.message
    );

    process.exit(1);
  }
};

startServer();