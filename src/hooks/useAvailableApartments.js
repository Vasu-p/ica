import { useState } from "react";
import { getAvailableApartments, getCommunityByCities } from "../apis";

export const useAvailableApartments = () => {
  const [availableApartments, setAvailableApartments] = useState([]);
  const [numBeds, setNumBeds] = useState([]);
  const [numBaths, setNumBaths] = useState([]);
  const [minArea, setMinArea] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);

  const fetchApartments = async () => {
    setLoading(true);
    const communitiesResponse = await getCommunityByCities(cities);
    const response = await getAvailableApartments(
      communitiesResponse.data.hits.map((community) => community.objectID),
      numBeds,
      numBaths,
      minArea,
      maxPrice
    );
    setAvailableApartments(response.data.hits);
    setLoading(false);
  };

  return {
    availableApartments,
    fetchApartments,
    setNumBeds,
    setNumBaths,
    setMinArea,
    setMaxPrice,
    setCities,
    loading,
  };
};
