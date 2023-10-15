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

export function getAvailableApartments(
  communityIds = [],
  beds = [],
  baths = [],
  minArea = 0,
  maxPrice = 100000
) {
  let filterString = `unitStartingPrice.price<=${maxPrice} AND unitSqFt>=${minArea}`;
  if (communityIds.length) {
    filterString += ` AND (communityIDAEM:${communityIds.join(
      " OR communityIDAEM:"
    )})`;
  }
  if (beds.length) {
    filterString += ` AND (floorplanBed=${beds.join(" OR floorplanBed=")})`;
  }
  if (baths.length) {
    filterString += ` AND (floorplanBath=${baths.join(" OR floorplanBath=")})`;
  }

  return axios.post("https://search.irvinecompanyapartments.com/search", {
    index: "prod_ica_unitAvailability_unitEarliestAvailable_asc",
    query: "",
    params: {
      hitsPerPage: 3000,
      attributesToHighlight: [],
      filters: filterString,
      attributesToRetrieve: [
        "communityIDAEM",
        "communityMarketingName",
        "floorplanName",
        "unitCRMID",
        "floorplanBed",
        "floorplanBath",
        "unitSqFt",
        "unitStartingPrice.price",
        "unitAmenities",
        "unitEarliestAvailable",
      ],
    },
  });
}

export function getCommunityByCities(cities = []) {
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
      // enclose city name in single quotes to avoid issues with spaces
      filters: cities.length
        ? `cityName:'${cities.join("' OR cityName:'")}'`
        : "",
    },
  });
}
