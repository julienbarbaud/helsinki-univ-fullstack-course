import { useQuery } from "@apollo/client/react";
import { REPOSITORIES_QUERY } from "../graphql/queries";

const useRepositories = () => {
  const { data, loading, error } = useQuery(REPOSITORIES_QUERY);

  if (error) {
    console.error("error fetching repositories");
    console.error(error);
  }
  if (loading || error) return { edges: [] };

  return data.repositories;
};

export default useRepositories;
