const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const jwt = require("jsonwebtoken");

const startServer = (port) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  startStandaloneServer(server, {
    listen: { port },
    async context({ req }) {
      const auth = req.headers.authorization;
      if (!auth || !auth.startsWith("Bearer ")) return null;
      const token = auth.split(" ")[1];
      const curUser = jwt.verify(token, process.env.JWT_SECRET);
      return { curUser };
    },
  }).then(() => console.log("server running"));
};

module.exports = startServer;
