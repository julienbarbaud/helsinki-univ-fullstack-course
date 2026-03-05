const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const Author = require("./models/author");
const Book = require("./models/books");
const User = require("./models/user");

const pubsub = new PubSub();

const resolvers = {
  Book: {
    author: async ({ author }) => Author.findById(author),
  },

  Author: {
    bookCount: async ({ id }) => (await Book.find({ author: id })).length,
  },

  Query: {
    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (_, { genre }) => {
      if (!genre) return Book.find({});
      return Book.find({ genres: genre });
    },

    allAuthors: async () => Author.find({}),

    me: async (_, __, context) => {
      console.log(context.curUser);
      return context.curUser;
    },
  },

  Mutation: {
    async addBook(_, data, context) {
      if (!context.curUser) {
        throw new GraphQLError("only logged-in users can add books");
      }
      // this sucks because no atomicity: if book validation fails, new author is still added
      // right way to handle this: MONGOOSE TRANSACTIONS, but seems outside the scope of the course
      try {
        const { author, ...otherData } = data;
        let authorDocument = await Author.findOne({ name: author });
        console.log("authorDoc before test: ", authorDocument);
        if (!authorDocument) {
          const newAuthor = new Author({ name: author });
          authorDocument = await newAuthor.save();
        }
        console.log(`author doc after test: ${authorDocument}`);
        const newBook = new Book({ ...otherData, author: authorDocument._id });
        pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
        return newBook.save();
      } catch (error) {
        console.log(error);
        throw new GraphQLError(`failed to add book ${data.title}`);
      }
    },
    async editAuthor(root, { name, setBornTo }, context) {
      if (!context.curUser) {
        throw new GraphQLError("only logged-in users can edit an author");
      }
      try {
        const author = await Author.findOne({ name });
        if (!author) return null;
        author.born = setBornTo;
        return author.save();
      } catch (error) {
        console.log(error);
        throw new GraphQLError(`failed to edit author ${name}`);
      }
    },
    async createUser(_, data) {
      const user = new User(data);
      return user.save();
    },
    async login(_, { username, password }) {
      const user = await User.findOne({ username });
      if (!user) throw new GraphQLError(`no user named ${username}`);
      if (password !== process.env.DUMMY_PASSWORD)
        throw new GraphQLError("wrong password");
      console.log(user);
      const token = jwt.sign(user.toObject(), process.env.JWT_SECRET);
      return token;
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
