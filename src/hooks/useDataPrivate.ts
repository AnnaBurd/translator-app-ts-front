import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetchPrivate from "./useFetchPrivate";

/**
 * Load data from the backend on the component mount.
 * If access token is expired and can not be refreshed redirects to signin page.
 * @param url - backend api endpoint, e.g. users, docs, docs/:docid
 */
const useDataPrivate = (url: string): [unknown, boolean, string] => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPrivate = useFetchPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Controller is used to cancel repeating requests during useEffect cleanup call
    const controller = new AbortController();

    // Wrap callback in async function to use async-await inside useEffect hook
    const fetchData = async () => {
      try {
        const data = await fetchPrivate(url, "GET", null, controller.signal);

        setData(data);

        // console.log(
        //   "useDataPrivate: successfully fetched and set data from url ",
        //   url,
        //   data
        // );
      } catch (error) {
        // Access token has expired and can not be refreshed - redirect to signin page
        if (
          (error as Error).message ===
          "refreshAccessToken: Fail to refresh expired access token"
        ) {
          navigate("/signin", { replace: true, state: { from: location } });
        }

        // Request was cancelled by controller on useEffect cleanup - ignore error, either the component was unmounted or a new request was made
        if ((error as DOMException)?.name === "AbortError") {
          // console.log(
          //   "Request was cancelled by controller on useEffect cleanup"
          // );
        } else {
          // TODO: manage errors and display them to the user
          // console.log("UNHANDLED Error fetching data", error);
          setError("UNHANDLED Error fetching data");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup all ongoing fetch requests - they are outdated for a new component render / after component unmounts. The corresponding fetch() call will throw an AbortError exception.
      controller.abort();
    };
  }, [url, navigate, location, fetchPrivate]);

  return [data, isLoading, error];
};

export default useDataPrivate;
