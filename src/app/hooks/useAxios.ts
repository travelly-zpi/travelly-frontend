import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

export const useAxios = (config: AxiosRequestConfig) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | object>("");
  const [loading, setLoading] = useState(true);

  const fetchData = async (axiosConfig: AxiosRequestConfig) => {
    try {
      const result = await axios.request(axiosConfig);
      setResponse(result.data);
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("Error: Request couldn't be sent");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(config);
  }, []);

  return { response, error, loading };
};
