import axios from "axios";

export function getAllCommunities() {
  return axios.post("https://search.irvinecompanyapartments.com/search", {
    index: "prod_ica_community",
    query: "",
    params: {
      hitsPerPage: 1000,
      attributesToHighlight: [],
      attributesToRetrieve: [
        "osPropertyIds",
        "cityName",
        "calc_minBedrooms",
        "calc_maxBedrooms",
        "calc_minRent",
        "calc_maxRent",
        "communityName",
      ],
    },
  });
}

export function getAllAvailableApartments(propertyIds) {
  const propertyIdsFilter = propertyIds
    .map((propertyId) => `(propertyID:${propertyId})`)
    .join(" OR ");
  console.log("propertyids filter", propertyIdsFilter);

  return axios.post(
    "https://search.irvinecompanyapartments.com/multipleQueries",
    {
      queries: [
        {
          indexName: "prod_ica_unitAvailability",
          query: "",
          params: {
            hitsPerPage: 100,
            attributesToHighlight: [],
            filters: propertyIdsFilter,
            attributesToRetrieve: [
              "floorplanName",
              "unitMarketingName",
              "featuredAmenity",
              "floorplanUniqueID",
              "floorplanCRMID",
              "unitCRMID",
              "unitTypeCode",
              "propertyID",
              "propertyAddress",
              "buildingNumber",
              "floorplanID",
              "floorplanBath",
              "floorplanBed",
              "floorplanDeposit",
              "unitID",
              "unitFloor",
              "unitSqFt",
              "unitIsStudio",
              "unitTypeName",
              "unitAmenities",
              "unitStartingPrice",
              "unitEarliestAvailable",
              "unitConcessions",
              "communityMarketingName",
              "communityIDAEM",
              "propertyZip",
              "floorplanSqFt",
            ],
          },
        },
      ],
    }
  );
}
