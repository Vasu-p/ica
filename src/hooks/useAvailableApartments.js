import { useEffect, useState } from "react";
import { getAvailableApartments, getCommunityByCities } from "../apis";

export const useAvailableApartments = () => {
  const [availableApartments, setAvailableApartments] = useState([]);
  const [numBeds, setNumBeds] = useState([]);
  const [numBaths, setNumBaths] = useState([]);
  const [minArea, setMinArea] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);

  const fetchApartments = async () => {
    setLoading(true);
    const communityIds = getCommunityByCities(cities);
    const response = await getAvailableApartments(
      communityIds,
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
