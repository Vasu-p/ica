import { AnalyticalTable } from "@ui5/webcomponents-react";
import React, { useEffect, useMemo, useState } from "react";
import { getAllCommunities } from "../apis";

export function CommunityList() {
  const [communityList, setCommunityList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const communityListResponse = await getAllCommunities();
      return communityListResponse.data.hits;
    }
    fetchData().then((data) => setCommunityList(data));
  }, []);

  const columns = useMemo(
    () => [
      {
        id: "city",
        Header: "City",
        accessor: "cityName",
        sortType: "alphanumeric",
      },
      {
        id: "community",
        Header: "Community",
        accessor: "communityName",
      },
      {
        id: "minBed",
        Header: "Min Bedrooms",
        accessor: "calc_minBedrooms",
      },
      {
        id: "maxBed",
        Header: "Max Bedrooms",
        accessor: "calc_maxBedrooms",
      },
      {
        id: "minRent",
        Header: "Min Rent",
        accessor: "calc_minRent",
      },
      {
        id: "maxRent",
        Header: "Max Rent",
        accessor: "calc_maxRent",
      },
    ],
    []
  );

  return (
    <AnalyticalTable
      data={communityList}
      columns={columns}
      groupBy={["city"]}
      groupable={true}
      filterable={true}
    />
  );
}
