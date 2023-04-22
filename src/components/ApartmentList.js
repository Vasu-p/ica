import {
  AnalyticalTable,
  AnalyticalTableScaleWidthMode,
  Badge,
  Button,
  FlexBox,
  FlexBoxDirection,
  Toolbar,
  ToolbarSpacer,
} from "@ui5/webcomponents-react";
import moment from "moment";
import React, { useMemo } from "react";

export function ApartmentList({ communities, onClose, ...otherProps }) {
  const columns = useMemo(
    () => [
      {
        id: "communityName",
        Header: "Community Name",
        accessor: "communityMarketingName",
      },
      {
        id: "numBedBatch",
        Header: "Num Bed - Num Bath",
        accessor: (row) => `${row.floorplanBed}-${row.floorplanBath}`,
      },
      {
        id: "floor",
        Header: "Floor",
        accessor: "unitFloor",
      },
      {
        id: "area",
        Header: "Area",
        accessor: "unitSqFt",
      },
      {
        id: "amenities",
        Header: "Amenities",
        accessor: "unitAmenities",
        minWidth: 200,
        Cell: ({ cell: { value } }) => {
          return (
            <FlexBox direction={FlexBoxDirection.Column}>
              {value.map((amenity) => (
                <Badge colorScheme="8">{amenity}</Badge>
              ))}
            </FlexBox>
          );
        },
      },
      {
        id: "available",
        Header: "Earliest Available",
        accessor: (row) =>
          moment
            .unix(row.unitEarliestAvailable.dateTimeStamp)
            .format("MM-DD-YYYY"),
      },
      {
        id: "price",
        Header: "Price",
        accessor: "unitEarliestAvailable.price",
      },
    ],
    []
  );

  const data = [
    {
      communityIDAEM: "f8bef0ae-3b66-434a-b210-b17b38f61a03",
      floorplanName: "Plan B",
      communityMarketingName: "San Mateo",
      propertyID: 2265072,
      propertyAddress: "100 Cantata",
      propertyZip: "92606-8339",
      buildingNumber: "08",
      floorplanID: "7",
      floorplanUniqueID: "2265072_7",
      floorplanBath: 1,
      floorplanBed: 0,
      floorplanSqFt: 556,
      floorplanDeposit: 600,
      unitID: "152",
      unitMarketingName: "254",
      unitTypeCode: "S1CB",
      unitFloor: 2,
      unitSqFt: 556,
      unitIsStudio: true,
      unitTypeName: "Studio",
      unitAmenities: [
        "2nd Floor",
        "Detached 1 Car Garage",
        "Patio/Balcony",
        "sexy",
      ],
      unitStartingPrice: {
        date: "20230421",
        dateTimeStamp: 1682035200,
        term: 14,
        price: 2170,
      },
      unitEarliestAvailable: {
        date: "20230421",
        dateTimeStamp: 1682035200,
        term: 14,
        price: 2170,
      },
      featuredAmenity: " ",
      floorplanCRMID: "0x00000000000002DA",
      unitCRMID: "0x0000000000004730",
      objectID: "2265072_7_152",
    },
  ];

  return (
    <AnalyticalTable
      header={
        <Toolbar>
          <ToolbarSpacer />
          <Button onClick={onClose}>Close</Button>
        </Toolbar>
      }
      data={data}
      columns={columns}
      groupable={true}
      filterable={true}
      rowHeight={70}
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
