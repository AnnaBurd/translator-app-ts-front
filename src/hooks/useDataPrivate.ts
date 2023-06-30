import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetchPrivate from "./useFetchPrivate";

/**
 * Load data from the backend on the component mount.
 * If access token is expired and can not be refreshed redirects to signin page.
 * @param url - backend api endpoint, e.g. users, docs, docs/:docid
 */
const useDataPrivate = <T>(
  url: string
): [T | null, boolean, string, (id: string) => Promise<void>] => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPrivate = useFetchPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const deleteDataItem = async (id: string) => {
    // console.log("deleteData: ", id);

    // Filter out data in array with the given id
    setData((prevData) => {
      if (prevData instanceof Array) {
        return prevData.filter((item) => item._id !== id) as T;
      }

      return null;
    });

    // Save changes to the database
    try {
      await fetchPrivate(`${url}/${id}`, "DELETE", null);
    } catch (error) {
      // TODO: manage errors and display them to the user
      console.log("Error deleting data", error);
    }
  };

  useEffect(() => {
    // Controller is used to cancel repeating requests during use Effect cleanup call
    const controller = new AbortController();

    // Wrap callback in async function to use async-await inside useEffect hook
    const fetchData = async () => {
      try {
        const data = (await fetchPrivate(
          url,
          "GET",
          null,
          controller.signal
        )) as T;

        setData(data);
        setIsLoading(false);

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
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      // Cleanup all ongoing fetch requests - they are outdated for a new component render / after component unmounts. The corresponding fetch() call will throw an AbortError exception.
      controller.abort();
    };
  }, [url, navigate, location, fetchPrivate]);

  return [data, isLoading, error, deleteDataItem];
};

export default useDataPrivate;
