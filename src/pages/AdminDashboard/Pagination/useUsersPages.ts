import { useState } from "react";
import { User } from "../../../@types/user";
import useDocumentsPrivate from "../../../hooks/useDocumentsPrivate";

const useUsersPages = (totalUsersCount: number, usersPerPage: number) => {
  const {
    data: loadedUsers,
    errorFetchingData,
    fetchNextPage,
    isFetchingFirstPage,
  } = useDocumentsPrivate<User>("users", undefined, usersPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [firstTimeLoadingLastPage, setFirstTimeLoadingLastPage] =
    useState(true);

  const hasAlreadyLoadedCurrentPage =
    loadedUsers.length >= currentPage * usersPerPage ||
    (loadedUsers.length === totalUsersCount && loadedUsers.length > 0);

  const hasAlreadyLoadedNextPage =
    loadedUsers.length > currentPage * usersPerPage ||
    (loadedUsers.length === totalUsersCount && !firstTimeLoadingLastPage);
  // const hasAlreadyLoadedNextPage =
  //   loadedUsers.length > currentPage * usersPerPage ||
  //   (loadedUsers.length === totalUsersCount && loadedUsers.length > 0);

  const currentlyLoadedPage = hasAlreadyLoadedCurrentPage
    ? currentPage
    : currentPage - 1;

  const isLoadingCurrentPage = currentPage !== currentlyLoadedPage;

  const handleNextPage = () => {
    if (isLoadingCurrentPage) return;
    setCurrentPage((prev) => prev + 1);

    const hasAlreadyLoadedNextPage =
      loadedUsers.length >= (currentPage + 1) * usersPerPage ||
      (loadedUsers.length === totalUsersCount && loadedUsers.length > 0);

    if (!hasAlreadyLoadedNextPage) fetchNextPage();

    if (currentPage + 1 === Math.ceil(totalUsersCount / usersPerPage))
      setTimeout(() => {
        setFirstTimeLoadingLastPage(false);
      }, 1500);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  return {
    loadedUsers,
    isFetchingFirstPage,
    errorFetchingData,
    fetchNextPage,
    handleFirstPage,
    handleNextPage,
    handlePreviousPage,
    isLoadingCurrentPage,
    hasAlreadyLoadedPage: hasAlreadyLoadedNextPage,
    currentPage: currentlyLoadedPage,
  };
};

export default useUsersPages;
