import React from "react";
import { useGetAllOffersQuery } from "./api/types-and-hooks";

import { createGraphQLMock } from "./mocks";
console.log("here");


createGraphQLMock();

function App() {
  const data = useGetAllOffersQuery();

  if (data.isLoading) return <div>Loading data...</div>;

  console.log("offers", data.data?.offers);
  return <div>Open console to see logged data</div>;
}

export default App;
