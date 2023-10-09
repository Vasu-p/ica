import {
  AnalyticalTable,
  AnalyticalTableSelectionMode,
  Button,
  Toolbar,
  ToolbarSpacer,
  IllustratedMessage,
  FilterBar,
  FilterGroupItem,
  MultiComboBox,
  MultiComboBoxItem,
  Input,
  Select,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-fiori/dist/illustrations/BeforeSearch";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getAllCommunities } from "../apis";

import { TableHeader } from "../common/TableHeader";

export function CommunityList({ onShowDetails, slot, ...otherprops }) {
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
        Header: <TableHeader text={"City"} />,
        accessor: "cityName",
        sortType: "alphanumeric",
      },
      {
        id: "community",
        Header: <TableHeader text={"Community"} />,
        accessor: "communityName",
      },
      {
        id: "minBed",
        Header: <TableHeader text={"Min Bedrooms"} />,
        accessor: "calc_minBedrooms",
      },
      {
        id: "maxBed",
        Header: <TableHeader text={"Max Bedrooms"} />,
        accessor: "calc_maxBedrooms",
      },
      {
        id: "minRent",
        Header: <TableHeader text={"Min Rent"} />,
        accessor: "calc_minRent",
      },
      {
        id: "maxRent",
        Header: <TableHeader text={"Max Rent"} />,
        accessor: "calc_maxRent",
      },
    ],
    []
  );

  return (
    <div slot={slot}>
      <FilterBar
        hideToolbar={true}
        hideFilterConfiguration={true}
        style={{ padding: "1rem" }}
        showGoOnFB={true}
        onGo={() => {}}
      >
        <FilterGroupItem label="City" required>
          <MultiComboBox>
            <MultiComboBoxItem text="Irvine" />
          </MultiComboBox>
        </FilterGroupItem>
        <FilterGroupItem label="Num Bed">
          <MultiComboBox>
            <MultiComboBoxItem text="1" />
          </MultiComboBox>
        </FilterGroupItem>
        <FilterGroupItem label="Num Bath">
          <MultiComboBox>
            <MultiComboBoxItem text="1" />
          </MultiComboBox>
        </FilterGroupItem>
        <FilterGroupItem label="Max Price">
          <Input />
        </FilterGroupItem>
        <FilterGroupItem label="Min Area">
          <Input />
        </FilterGroupItem>
        <FilterGroupItem label="Amenities">
          <Select></Select>
        </FilterGroupItem>
      </FilterBar>
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
        headerRowHeight={50}
        selectionMode={AnalyticalTableSelectionMode.MultiSelect}
        onRowSelect={(e) => {
          setSelectedCommunities(
            e.detail.selectedFlatRows.map((row) => row.original)
          );
        }}
        NoDataComponent={() => (
          <IllustratedMessage
            subtitleText={"Select one or more cities to start"}
          />
        )}
        {...otherprops}
      />
    </div>
  );
}
