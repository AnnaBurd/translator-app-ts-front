import { useState, useEffect, useContext } from "react";
import useRefreshAccessToken from "../auth/useRefreshAccessToken";
import Config from "../../config.json";
import AuthContext from "../auth/AuthContext";

const useDataPrivate = (url: string) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { accessToken } = useContext(AuthContext);
  const refreshAccessToken = useRefreshAccessToken();

  console.log("USE DATA PRIVATE - hook body");

  useEffect(() => {
    const controller = new AbortController();

    console.log("USE DATA PRIVATE - use effect body");

    const fetchData = async () => {
      try {
        console.log(`USE DATA PRIVATE - 🚀Fetch - first attempt for /${url}`);
        let response = await fetch(`${Config.API_BASE_URL}/${url}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          signal: controller.signal,
        });

        // TODO: update to 401 here and on server side
        if (!response.ok) {
          console.log(
            "USE DATA PRIVATE - access expired, refreshing token",
            response.status
          );

          const newAccessToken = await refreshAccessToken();
          response = await fetch(`${Config.API_BASE_URL}/${url}`, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });

          if (!response.ok) {
            console.log(
              `USE DATA PRIVATE - 🚀Fetch - Second attempt failed for /${url} and new token ${newAccessToken}`
            );
            throw new Error("Could not load data");
          }
        } else {
          const json = await response.json();
          setData(json.docs);

          console.log("USE DATA PRIVATE - got final response", response.status);
        }
      } catch (error) {
        // TODO: set error
        // setError("UNHANDLED Error fetching data");
        console.log("UNHANDLED Error fetching data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      console.log("USE DATA PRIVATE - Cleanup after useeffect");

      controller.abort();
    };
  }, [url, accessToken, refreshAccessToken]);

  return [data, isLoading, error];
};

export default useDataPrivate;
