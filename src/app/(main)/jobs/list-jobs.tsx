import React from "react";
import { GET_JOBS } from "#/shared/graphql/queries";
import { useQuery } from "@apollo/client";

export const ListJobs: React.FC = () => {
  const { data, loading, error } = useQuery(GET_JOBS);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  const jobs = data?.getAllJobs || [];

  console.log(jobs);

  return (
    <div>
      ádasdasda
    </div>
  );
};
