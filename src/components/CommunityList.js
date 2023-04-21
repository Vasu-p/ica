import {
  AnalyticalTable,
  AnalyticalTableSelectionMode,
  Button,
  Toolbar,
  ToolbarSpacer,
} from "@ui5/webcomponents-react";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getAllCommunities } from "../apis";

export function CommunityList({ onShowDetails, ...otherprops }) {
  const [communityList, setCommunityList] = useState([]);
  const [selectedCommunities, setSelectedCommunities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const communityListResponse = await getAllCommunities();
      return communityListResponse.data.hits;
    }
    fetchData().then((data) => setCommunityList(data));
  }, []);

  const handleShowDetails = useCallback(() => {
    onShowDetails(selectedCommunities);
  }, [onShowDetails, selectedCommunities]);

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
      header={
        <Toolbar>
          <ToolbarSpacer />
          <Button onClick={handleShowDetails}>Show Details</Button>
        </Toolbar>
      }
      data={communityList}
      columns={columns}
      groupBy={["city"]}
      groupable={true}
      filterable={true}
      selectionMode={AnalyticalTableSelectionMode.MultiSelect}
      onRowSelect={(e) => setSelectedCommunities(e.detail.selectedFlatRows)}
      {...otherprops}
    />
  );
}
