import { useQuery } from "@apollo/client/react";
import { REPOSITORIES_QUERY } from "../graphql/queries";

const useRepositories = (selectedOrder, searchKeyword, pageSize = 4) => {
  let variables;
  switch (selectedOrder) {
    case "top-rated":
      variables = {
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC",
      };
      break;
    case "lowest-rated":
      variables = {
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
      };
      break;
    case "latest":
      variables = {
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
      };
      break;
  }

  variables.searchKeyword = searchKeyword;
  variables.first = pageSize;

  const { data, loading, error, fetchMore } = useQuery(REPOSITORIES_QUERY, {
    variables,
  });

  if (error) {
    console.error("error fetching repositories");
    console.error(error);
  }
  if (loading || error) return [{ edges: [] }, () => {}];

  return [
    data.repositories,
    () => {
      fetchMore({
        variables: {
          after: data.repositories.pageInfo.endCursor,
          ...variables,
        },
      });
    },
  ];
};

export default useRepositories;
