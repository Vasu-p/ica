import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import {
  AnalyticalTable,
  AnalyticalTableScaleWidthMode,
  Button,
  Toolbar,
  ToolbarSpacer,
} from "@ui5/webcomponents-react";

import { getPropertyIdsForCommunities } from "../utils";
import { getAllAvailableApartments } from "../apis";
import { TableHeader } from "./../common/TableHeader";

export function ApartmentList({ communities, onClose, ...otherProps }) {
  console.log("apartment list comms", communities);
  const [availableApartments, setAvailableApartments] = useState([]);

  const columns = useMemo(
    () => [
      {
        id: "communityName",
        Header: <TableHeader text={"Community Name"} />,
        accessor: "communityMarketingName",
      },
      {
        id: "numBedBatch",
        Header: <TableHeader text={"Num Bed - Num Bath"} />,
        accessor: (row) => `${row.floorplanBed}-${row.floorplanBath}`,
      },
      {
        id: "floor",
        Header: <TableHeader text={"Floor"} />,
        accessor: "unitFloor",
      },
      {
        id: "area",
        Header: <TableHeader text={"Area"} />,
        accessor: "unitSqFt",
      },
      {
        id: "amenities",
        Header: <TableHeader text={"Amenities"} />,
        accessor: "unitAmenities",
        minWidth: 300,
        Cell: ({ cell: { value } }) => (
          <span style={{ textWrap: "balance" }}>{value.join(", ")}</span>
        ),
      },
      {
        id: "available",
        Header: <TableHeader text={"Earliest Available"} />,
        accessor: (row) =>
          moment
            .unix(row.unitEarliestAvailable.dateTimeStamp)
            .format("MM-DD-YYYY"),
      },
      {
        id: "price",
        Header: <TableHeader text={"Price"} />,
        accessor: "unitEarliestAvailable.price",
      },
    ],
    []
  );

  const propertyIds = useMemo(
    () => getPropertyIdsForCommunities(communities),
    [communities]
  );

  console.log("property ids", propertyIds);

  useEffect(() => {
    async function fetchAvailableApartments() {
      const response = await getAllAvailableApartments(propertyIds);
      console.log("response", response);
      return response.data.results[0].hits;
    }
    fetchAvailableApartments().then((data) => {
      console.log("data", data);
      setAvailableApartments(data);
    });
  }, [propertyIds]);

  return (
    <AnalyticalTable
      header={
        <Toolbar>
          <ToolbarSpacer />
          <Button onClick={onClose}>Close</Button>
        </Toolbar>
      }
      data={availableApartments}
      columns={columns}
      groupable={true}
      filterable={true}
      rowHeight={100}
      scaleWidthMode={AnalyticalTableScaleWidthMode.Smart}
      {...otherProps}
    />
  );
}
/*
{
                    "communityIDAEM": "f8bef0ae-3b66-434a-b210-b17b38f61a03",
                    "floorplanName": "Plan B",
                    "communityMarketingName": "San Mateo",
                    "propertyID": 2265072,
                    "propertyAddress": "100 Cantata",
                    "propertyZip": "92606-8339",
                    "buildingNumber": "08",
                    "floorplanID": "7",
                    "floorplanUniqueID": "2265072_7",
                    "floorplanBath": 1,
                    "floorplanBed": 0,
                    "floorplanSqFt": 556,
                    "floorplanDeposit": 600,
                    "unitID": "152",
                    "unitMarketingName": "254",
                    "unitTypeCode": "S1CB",
                    "unitFloor": 2,
                    "unitSqFt": 556,
                    "unitIsStudio": true,
                    "unitTypeName": "Studio",
                    "unitAmenities": [
                        "2nd Floor",
                        "Detached 1 Car Garage",
                        "Patio/Balcony"
                    ],
                    "unitStartingPrice": {
                        "date": "20230421",
                        "dateTimeStamp": 1682035200,
                        "term": 14,
                        "price": 2170
                    },
                    "unitEarliestAvailable": {
                        "date": "20230421",
                        "dateTimeStamp": 1682035200,
                        "term": 14,
                        "price": 2170
                    },
                    "featuredAmenity": " ",
                    "floorplanCRMID": "0x00000000000002DA",
                    "unitCRMID": "0x0000000000004730",
                    "objectID": "2265072_7_152"
                },
*/
