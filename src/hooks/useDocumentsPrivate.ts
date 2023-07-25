import { ScreenSize } from "./useScreenSize";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetchPrivate from "./useFetchPrivate";

type Slugified = {
  slug?: string;
  id?: string;
};

const useDocumentsPrivate = <T extends Slugified>(
  url: string,
  screenSize?: ScreenSize
): {
  data: T[];
  isFetchingData: boolean;
  errorFetchingData: string;
  deleteDataItem: (slug: string) => Promise<void>;
  fetchNextPage: () => void;
  totalPages: number;
  isFetchingFirstPage: boolean;
} => {
  const [data, setData] = useState<T[]>([]);
  const [isFetchingData, setIsFetching] = useState(false);
  const [isFetchingFirstPage, setIsFetchingFirstPage] = useState(true);
  const [errorFetchingData, setErrorFetchingData] = useState("");

  const [fetchMore, setFetchMore] = useState(true);
  const [totalPages, setTotalPages] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);

  // TODO: adjust
  const maxDocuments =
    screenSize === "large" ? 100 : screenSize === "medium" ? 50 : 30;
  const itemsPerPage =
    screenSize === "large" ? 9 : screenSize === "medium" ? 6 : 3;
  // if (documentsPerPage) itemsPerPage = documentsPerPage;

  const fetchPrivate = useFetchPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const fetchNextPage = () => {
    // Workaround to avoid setting state while component renders
    // TODO: reconsider after refactoring
    if (!fetchMore) {
      setTimeout(() => setFetchMore(true), 0);
    }
  };

  const deleteDataItem = async (slug: string) => {
    setData((prevData) => {
      return prevData.filter((item) => item.slug !== slug);
    });

    // Save changes to the database
    try {
      console.log("DELETING DATA", slug);
      await fetchPrivate(`${url}/${slug}`, "DELETE", null);
    } catch (error) {
      // TODO: manage errors and display them to the user
      console.log("Error deleting data", error);
    }
  };

  const shouldBeFetching =
    !isFetchingData &&
    !errorFetchingData &&
    (currentPage <= totalPages || totalPages < 0) &&
    fetchMore &&
    data.length < maxDocuments;

  useEffect(() => {
    // Controller is used to cancel repeating requests during use Effect cleanup call
    const controller = new AbortController();

    // Wrap callback in async function to use async-await inside useEffect hook
    const fetchAndAddPageData = async () => {
      try {
        if (!shouldBeFetching) return;

        const [fetchedData, currPage, totalPages] = await fetchPrivate(
          `${url}`,
          "GET",
          null,
          controller.signal,
          currentPage,
          itemsPerPage
        );

        setTotalPages(+totalPages);
        setCurrentPage(+currPage + 1);
        setData((prevData) => [...prevData, ...fetchedData]);
        setIsFetching(false);
        setFetchMore(false);
        setIsFetchingFirstPage(false);
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
          setErrorFetchingData("🌋🌋🌋🔍 UNHANDLED Error fetching data");
          setIsFetching(false);
        }
      }
    };

    fetchAndAddPageData();

    return () => {
      // Cleanup all ongoing fetch requests - they are outdated for a new component render / after component unmounts. The corresponding fetch() call will throw an AbortError exception.
      controller.abort();
    };
  }, [
    url,
    navigate,
    location,
    fetchPrivate,
    currentPage,
    data,
    isFetchingData,
    errorFetchingData,
    shouldBeFetching,
    itemsPerPage,
  ]);

  return {
    data,
    isFetchingData,
    errorFetchingData,
    deleteDataItem,
    fetchNextPage,
    totalPages,
    isFetchingFirstPage,
  };
};

export default useDocumentsPrivate;
