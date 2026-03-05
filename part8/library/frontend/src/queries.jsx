import { gql } from "@apollo/client";

export const booksQuery = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`;

export const authorQuery = gql`
  {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const userQuery = gql`
  {
    me {
      username
      favoriteGenre
    }
  }
`;

export const createBookMutation = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int
    $genres: [String!]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
    }
  }
`;

export const editAuthorMutation = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

export const loginMutation = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export const bookAdded = gql`
  subscription {
    bookAdded {
      title
    }
  }
`;
