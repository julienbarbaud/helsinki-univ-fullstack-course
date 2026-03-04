const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/books");
const User = require("./models/user");

// let authors = [
//   {
//     name: "Robert Martin",
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: "Martin Fowler",
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963,
//   },
//   {
//     name: "Fyodor Dostoevsky",
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821,
//   },
//   {
//     name: "Joshua Kerievsky", // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   {
//     name: "Sandi Metz", // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ];

// /*
//  * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
//  * However, for simplicity, we will store the author's name in connection with the book
//  */

// const books = [
//   {
//     title: "Clean Code",
//     published: 2008,
//     author: "Robert Martin",
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring"],
//   },
//   {
//     title: "Agile software development",
//     published: 2002,
//     author: "Robert Martin",
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ["agile", "patterns", "design"],
//   },
//   {
//     title: "Refactoring, edition 2",
//     published: 2018,
//     author: "Martin Fowler",
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring"],
//   },
//   {
//     title: "Refactoring to patterns",
//     published: 2008,
//     author: "Joshua Kerievsky",
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "patterns"],
//   },
//   {
//     title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
//     published: 2012,
//     author: "Sandi Metz",
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "design"],
//   },
//   {
//     title: "Crime and punishment",
//     published: 1866,
//     author: "Fyodor Dostoevsky",
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "crime"],
//   },
//   {
//     title: "Demons",
//     published: 1872,
//     author: "Fyodor Dostoevsky",
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "revolution"],
//   },
// ];

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
    // if (!(author || genre)) return books;
    // let matchingBooks = [...books];
    // if (author) {
    //   matchingBooks = matchingBooks.filter((book) => book.author === author);
    // }
    // if (genre) {
    //   matchingBooks = matchingBooks.filter((book) =>
    //     book.genres.includes(genre),
    //   );
    // }
    // return matchingBooks;

    allAuthors: async () => Author.find({}),
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
};

module.exports = resolvers;
