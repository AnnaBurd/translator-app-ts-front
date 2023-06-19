import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Config from "../../config.json";
import AuthContext from "../auth/AuthContext";
import useRefreshAccessToken from "../auth/useRefreshAccessToken";

/**
 * Fetch private data from the backend, if access token expired (backend returns token expired error) refresh access token and refetch data.
 * @param url - backend api endpoint, e.g. users, docs, docs/:docid
 */
const useDataPrivate = (url: string): [unknown, boolean, string] => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { accessToken } = useContext(AuthContext);
  const refreshAccessToken = useRefreshAccessToken();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController(); // Controller is used to cancel repeating requests during useEffect cleanup call

    const fetchData = async () => {
      try {
        let response = await fetch(`${Config.API_BASE_URL}/${url}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          signal: controller.signal,
        });

        // TODO: update to 401 here and on server side
        if (!response.ok) {
          // Refresh access token
          const newAccessToken = await refreshAccessToken();

          // Retry fetching data
          response = await fetch(`${Config.API_BASE_URL}/${url}`, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });

          // Check if second attempt is successful
          if (!response.ok) {
            throw new Error(
              `useDataPrivate: Failed second attempt to fetch data from endpoint ${url} with token ...${newAccessToken.slice(
                -10
              )}`
            );
          }
        }
        const json = await response.json();
        setData(json.docs);

        console.log("useDataPrivate: got response", json.docs);
      } catch (error) {
        if (
          (error as Error).message ===
          "refreshAccessToken: Fail to refresh expired access token"
        ) {
          navigate("/signin", { replace: true, state: { from: location } });
        } else if ((error as DOMException)?.name === "AbortError") {
          console.log(
            "Request was cancelled by controller on useEffect cleanup"
          );
        } else {
          // TODO: manage errors
          console.log("UNHANDLED Error fetching data", error);
          setError("UNHANDLED Error fetching data");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, accessToken, refreshAccessToken, navigate, location]);

  return [data, isLoading, error];
};

export default useDataPrivate;
