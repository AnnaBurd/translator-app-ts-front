import { useCallback, useContext } from "react";
import Config from "../../config.json";
import AuthContext from "../auth/AuthContext";
import useRefreshAccessToken from "../auth/useRefreshAccessToken";

type RequestMethod = "POST" | "GET" | "PATCH" | "DELETE";

type RequestOptions = {
  method: RequestMethod;
  headers: HeadersInit & { Authorization: string };
  signal?: AbortSignal;
  body?: string;
};

const useFetchPrivate = () => {
  const { getAccessToken } = useContext(AuthContext);
  const refreshAccessToken = useRefreshAccessToken();

  const fetchPrivate = useCallback(
    async (
      url: string,
      method: RequestMethod = "GET",
      data: unknown,
      signal?: AbortSignal
    ) => {
      const options: RequestOptions = {
        method,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal,
      };

      if (data !== null) {
        options.body = JSON.stringify(data);
      }

      // console.log(
      //   "useFetchPrivate: fetching data from endpoint - attempt 1",
      //   url,
      //   options
      // );
      // Fetch data from backend using latest access token value
      let response = await fetch(`${Config.API_BASE_URL}/${url}`, options);

      // If server replies that access token has expired - try to refresh token and repeat request
      if (!response.ok && response.status === 401) {
        const newAccessToken = await refreshAccessToken();

        options.headers.Authorization = `Bearer ${newAccessToken}`;
        // console.log(
        //   "useFetchPrivate: fetching data from endpoint - attempt 2 after refreshing access token",
        //   url,
        //   options
        // );
        response = await fetch(`${Config.API_BASE_URL}/${url}`, options);
      }

      // If second attempt to fetch data fails - throw error
      if (!response.ok) {
        throw new Error(
          `useFetchPrivate: Failed second attempt to fetch data from endpoint ${url}.}`
        );
      }

      const json = await response.json();

      // console.log("json=", json);
      return json.data;
    },
    [getAccessToken, refreshAccessToken]
  );

  return fetchPrivate;
};

export default useFetchPrivate;
