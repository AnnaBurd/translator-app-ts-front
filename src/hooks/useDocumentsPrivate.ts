import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetchPrivate from "./useFetchPrivate";

type Slugified = {
  slug?: string;
  id?: string;
};

const useDocumentsPrivate = <T extends Slugified>(
  url: string
): {
  data: T[];
  isFetchingData: boolean;
  errorFetchingData: string;
  deleteDataItem: (slug: string) => Promise<void>;
  fetchNextPage: () => void;
  totalPages: number;
} => {
  const [data, setData] = useState<T[]>([]);
  const [isFetchingData, setIsFetching] = useState(false);
  const [errorFetchingData, setErrorFetchingData] = useState("");

  const [fetchMore, setFetchMore] = useState(true);
  // const [hasNextPage, setHasNextPage] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowSize, setWindowSize] = useState("large");

  // TODO: adjust
  const maxDocuments =
    windowSize === "large" ? 100 : windowSize === "medium" ? 50 : 30;
  const itemsPerPage =
    windowSize === "large" ? 9 : windowSize === "medium" ? 6 : 3;

  // TODO refactor dimensions hook from here and breadcrumbs component

  useEffect(() => {
    const mqlSmall = window.matchMedia("(min-width: 640px)");
    const mqlLarge = window.matchMedia("(min-width: 1280px)");

    if (!mqlSmall.matches) {
      setWindowSize("small");
    } else if (!mqlLarge.matches) {
      setWindowSize("medium");
    } else {
      setWindowSize("large");
    }

    // const onChange = () => setWindowSize(!!mql.matches);
    // mql.addEventListener("change", onChange);
    // setIsWide(mql.matches);
  }, []);

  const fetchPrivate = useFetchPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const fetchNextPage = () => {
    setFetchMore(true);
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

  console.log("-------------- useDocumentsPrivate hook body");

  const shouldBeFetching =
    !isFetchingData &&
    !errorFetchingData &&
    (currentPage < totalPages || !totalPages) &&
    fetchMore &&
    data.length < maxDocuments;

  useEffect(() => {
    console.log("-------------- useDocumentsPrivate useEffect");
    // Controller is used to cancel repeating requests during use Effect cleanup call
    const controller = new AbortController();

    // Wrap callback in async function to use async-await inside useEffect hook
    const fetchAndAddPageData = async () => {
      console.log("🏸 fetchAndAddPageData 🏸 ");
      // console.log("🏸 isFetchingData", isFetchingData);
      // console.log("🏸 errorFetchingData", errorFetchingData);
      // console.log(
      //   "🏸 should init fetching? ",
      //   !(isFetchingData || errorFetchingData || !hasNextPage)
      // );
      try {
        if (!shouldBeFetching) return;
        // setIsFetching(true);

        const [fetchedData, currPage, totalPages] = await fetchPrivate(
          `${url}`,
          "GET",
          null,
          controller.signal,
          currentPage,
          itemsPerPage
        );

        console.log(" 🔥🚜🔥 Data fetch private documents", fetchedData);
        console.log("🔥🚜🔥 Current page", currPage);
        console.log("🔥🚜🔥Total pages", totalPages);

        // if (data.length > 0) {
        //   setCurrentPage(currPage + 1);
        // }

        // setHasNextPage(+currPage < +totalPages);
        setTotalPages(+totalPages);
        setCurrentPage(+currPage + 1);
        setData((prevData) => [...prevData, ...fetchedData]);
        setIsFetching(false);
        setFetchMore(false);

        // setData((prevData) => [...prevData, ...(data as T)]);
        // setData((prevData) => [...prevData, ...data]);
        // setIsLoading(false);
        // if (page >= +totalPages) setLoadedAll(true);
        // setPage((prev) => prev + 1);

        // console.log(
        //   "useDataPrivate: successfully fetched and set data from url ",
        //   url,
        //   data
        // );
        // setIsFetching(false);
      } catch (error) {
        // Access token has expired and can not be refreshed - redirect to signin page

        console.log("useDocumentsPrivate error fetching 😶‍🌫️", error);
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
          setErrorFetchingData("UNHANDLED Error fetching data");
          setIsFetching(false);
        }
      }
    };

    fetchAndAddPageData();

    return () => {
      console.log("-------------- useDocumentsPrivate useEffect cleanup");
      console.log("abort 🚀🚀🎈 fetch docs");
      // setIsFetching(false);
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
  };
};

export default useDocumentsPrivate;
