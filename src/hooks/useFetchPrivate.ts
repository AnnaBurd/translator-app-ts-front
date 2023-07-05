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
      signal?: AbortSignal,
      page?: number,
      limit?: number
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

      if (url === "docs") console.log("🚀🚀🎈", "fetchPrivate", url);

      let requestUrl = `${Config.API_BASE_URL}/${url}`;
      if (page && limit)
        requestUrl = `${requestUrl}?page=${page}&limit=${limit}`;

      if (data !== null) {
        options.body = JSON.stringify(data);
      }

      // console.log(
      //   "useFetchPrivate: fetching data from endpoint - attempt 1",
      //   url,
      //   options
      // );
      // Fetch data from backend using latest access token value
      let response = await fetch(requestUrl, options);

      // If server replies that access token has expired - try to refresh token and repeat request
      if (!response.ok && response.status === 401) {
        const newAccessToken = await refreshAccessToken();

        options.headers.Authorization = `Bearer ${newAccessToken}`;
        // console.log(
        //   "useFetchPrivate: fetching data from endpoint - attempt 2 after refreshing access token",
        //   url,
        //   options
        // );
        response = await fetch(requestUrl, options);
      }

      // If second attempt to fetch data fails - throw error
      if (!response.ok) {
        throw new Error(
          `useFetchPrivate: Failed second attempt to fetch data from endpoint ${url}.}`
        );
      }

      // Successfully deleted data - no json returned
      if (response.status === 204) {
        return null;
      }

      const json = await response.json();

      if (page && limit) return [json.data, json.currentPage, json.totalPages];
      return json.data;
    },
    [getAccessToken, refreshAccessToken]
  );

  return fetchPrivate;
};

export default useFetchPrivate;
