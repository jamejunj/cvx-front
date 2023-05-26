import { useState, useEffect } from "react";
import axios from "axios";

const HOST_NAME = "http://localhost:3000";
const useFetch = (url, options = {}) => {
  url = HOST_NAME + url;
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('fetching', url)
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
        setLoading(false);
        console.log('fetched', url)
        console.log(response)
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log(error)
      }
    };
    fetchData();
  }, []);

  return { response, error, loading };
};

export default useFetch;