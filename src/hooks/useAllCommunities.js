import { useEffect, useState } from "react";
import { getAllCommunities } from "../apis";

export const useAllCommunities = () => {
  const [allCommunities, setAllCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      const response = await getAllCommunities();
      return response.data.hits;
    };
    fetchCommunities().then((communities) => setAllCommunities(communities));
  }, []);

  return {
    allCommunities: allCommunities,
  };
};
