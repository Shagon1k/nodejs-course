import { type Server as IServer } from "http";
import { type Socket as ISocket } from "net";
import logger from "./logger";

const CONNECTIONS_DESTROY_TIMEOUT = 10000; // ms
const FORCE_SHUTDOWN_TIMEOUT = 20000; // ms

const withGracefulShutdown = (server: IServer) => {
  let connections: ISocket[] = [];

  server.on("connection", (connection) => {
    // Once new connection created - add it to the pool.
    connections.push(connection);

    // Filter out closed connection
    connection.on("close", () => {
      connections = connections.filter(
        (currentConnection) => currentConnection !== connection
      );
    });
  });

  function shutdown() {
    logger.info("[SHUTDOWN] Received kill signal, shutting down gracefully");

    server.close(() => {
      logger.info("[SHUTDOWN] Closed out remaining connections");
      process.exit(0);
    });

    // End current connections
    connections.forEach((connection) => connection.end());

    // Then destroy connections
    setTimeout(() => {
      connections.forEach((connection) => connection.destroy());
    }, CONNECTIONS_DESTROY_TIMEOUT);

    setTimeout(() => {
      logger.error(
        "[SHUTDOWN] Could not close connections in time, forcefully shutting down"
      );
      process.exit(1);
    }, FORCE_SHUTDOWN_TIMEOUT);
  }

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);

  logger.debug("Graceful shutdown applied.");
};

export default withGracefulShutdown;
