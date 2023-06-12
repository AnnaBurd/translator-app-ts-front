import { useState, useEffect, useContext } from "react";
import Config from "../../config.json";
import { AppAuthContext } from "../auth/AuthProvider";

const useFetchData = (url: string) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(AppAuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${Config.API_URL}${url}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setIsLoading(false);
      }
    };

    fetchData();
    setIsLoading(false);

    return () => {
      console.log(
        "fetch cleanup (before component dismounts -> should cansel ongoing requests"
      );
    };
  }, [url, user]);

  return [data, isLoading, error];
};

export default useFetchData;
