import React, { useMemo } from "react";
import _ from "lodash";
import moment from "moment";
import {
  AnalyticalTable,
  AnalyticalTableScaleWidthMode,
  AnalyticalTableVisibleRowCountMode,
  Icon,
  IllustratedMessage,
  Link,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/map";

import { TableHeader } from "../common/TableHeader";

export function ApartmentList({ availableApartments, loading, ...otherProps }) {
  const amenitiesFilter = useMemo(
    () => (rows, id, filterValue) => {
      // separate filterValue with comma and return all rows which have all the amenities
      const filterValues = filterValue.split(",").map((val) => val.trim());
      return rows.filter((row) => {
        const rowAmenitiesString = row.original.unitAmenities.join(",");
        return filterValues.every((filterVal) =>
          rowAmenitiesString.toLowerCase().includes(filterVal.toLowerCase())
        );
      });
    },
    []
  );

  const columns = useMemo(() => [
    {
      id: "cityName",
      Header: <TableHeader text={"City"} />,
      accessor: "community.cityName",
      width: 100,
    },
    {
      id: "communityName",
      Header: <TableHeader text={"Community Name"} />,
      accessor: "communityMarketingName",
      Cell: ({
        cell: {
          row: { original },
        },
      }) => (
        <>
          <Link
            style={{ textWrap: "balance" }}
            href={original.community.communityExternalUrl}
            target="_blank"
          >
            {original.communityMarketingName}
          </Link>
          <Link
            href={`https://maps.google.com/?q=${original.community.dispCommLocationPt.lat},${original.community.dispCommLocationPt.lng}`}
            target="_blank"
          >
            <Icon name="map" />
          </Link>
        </>
      ),
      width: 150,
    },
    {
      id: "numBedBatch",
      Header: <TableHeader text={"Bed - Bath"} />,
      accessor: (row) => `${row.floorplanBed}-${row.floorplanBath}`,
      width: 50,
    },
    {
      id: "floor",
      Header: <TableHeader text={"Floor"} />,
      accessor: "unitFloor",
      width: 50,
    },
    {
      id: "area",
      Header: <TableHeader text={"Area"} />,
      accessor: "unitSqFt",
      width: 50,
    },
    {
      id: "amenities",
      Header: <TableHeader text={"Amenities"} />,
      accessor: "unitAmenities",
      filter: amenitiesFilter,
      Cell: ({ cell: { value } }) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {value.map((amenity) => (
            <span
              style={{
                display: "inline-block",
                padding: "2px",
                border: "solid black 1px",
                borderRadius: "5px",
              }}
            >
              {amenity}
            </span>
          ))}
        </div>
      ),
    },
    {
      id: "available",
      Header: <TableHeader text={"Earliest Available"} />,
      accessor: (row) => {
        const date = moment.unix(row.unitEarliestAvailable.dateTimeStamp);
        return date.isBefore(moment.now()) ? "Now" : date.format("MMM DD YYYY");
      },
      width: 100,
    },
    {
      id: "price",
      Header: <TableHeader text={"Price"} />,
      accessor: "unitEarliestAvailable.price",
      width: 100,
    },
  ]);

  // const rowHeight = useMemo(() => {
  //   const allAmenitiesLength = availableApartments
  //     .map((apt) => apt.unitAmenities)
  //     .map((amenities) => amenities.join(", "))
  //     .map((amenitieStr) => amenitieStr.length);

  //   return _.max(allAmenitiesLength) * 0.35 || 100;
  // }, [availableApartments]);

  return (
    <div style={{ height: "100%" }}>
      <AnalyticalTable
        data={availableApartments}
        columns={columns}
        groupable={true}
        filterable={true}
        rowHeight={70}
        headerRowHeight={50}
        alternateRowColor={true}
        scaleWidthMode={AnalyticalTableScaleWidthMode.Default}
        visibleRowCountMode={AnalyticalTableVisibleRowCountMode.Auto}
        loading={loading}
        NoDataComponent={() => <IllustratedMessage />}
        {...otherProps}
      />
    </div>
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
