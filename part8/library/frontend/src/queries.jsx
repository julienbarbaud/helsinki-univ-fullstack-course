import { gql } from "@apollo/client";

export const booksQuery = gql`
  {
    allBooks {
      title
      author {
        name
      }
      published
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
