const { ApolloServer } = require("@apollo/server");
const jwt = require("jsonwebtoken");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { expressMiddleware } = require("@as-integrations/express5");
const cors = require("cors");
const express = require("express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/use/ws");
const http = require("http");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const startServer = async (port) => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req.headers.authorization;
        if (!auth || !auth.startsWith("Bearer ")) return null;
        const token = auth.split(" ")[1];
        const curUser = jwt.verify(token, process.env.JWT_SECRET);
        return { curUser };
      },
    }),
  );

  httpServer.listen(port, () =>
    console.log(`Server is now running on http://localhost:${port}`),
  );
};

module.exports = startServer;
