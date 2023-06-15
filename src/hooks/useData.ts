import { useState, useEffect, useContext } from "react";
import Config from "../../config.json";
import AuthContext from "../auth/AuthContext";

let NuseFetchCycle = 0;
let NuseEffectCycle = 0;

const useData = (url: string) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user: authenticatedUser, refreshAccessToken } =
    useContext(AuthContext);

  NuseFetchCycle++;

  // TODO: cancel pending requests when component unmounts!
  useEffect(() => {
    NuseEffectCycle++;

    const fetchData = async (url: string) => {
      setIsLoading(true);
      setError(null);

      const fetchAttempt = async (accessToken: string) => {
        return fetch(`${Config.API_URL}${url}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      };

      try {
        console.log(
          `🚀Try fetch data from /${url} with token ${authenticatedUser?.accessToken?.slice(
            0,
            10
          )}`
        );

        let response = await fetchAttempt(
          authenticatedUser?.accessToken as string
        );

        // TODO: update to 401 on server side
        if (!response.ok) {
          console.log(
            `🚀Access token has expired for /${url} and token ${authenticatedUser?.accessToken} => Try to refresh it`
          );
          const newAccessToken = await refreshAccessToken();

          console.log(
            `🚀 Second try fetch data from /${url} with new token ${newAccessToken}`
          );
          response = await fetchAttempt(newAccessToken as string);
        }

        if (!response.ok) {
          console.log(
            `🚀 Second try also error for /${url} with new token ${authenticatedUser?.accessToken?.slice(
              0,
              10
            )}`
          );
          throw new Error(`🔥 Failed to fetch data from /${url}`);
        }

        const json = await response.json();

        console.log(
          `🚀 Successfully fetched data /${url} with new token ${authenticatedUser?.accessToken?.slice(
            0,
            10
          )}`,
          json
        );

        setData(json.docs);
        setIsLoading(false);
      } catch (error) {
        console.log(
          `🚀 Error fetching data after reattempt for /${url} with token ${authenticatedUser?.accessToken?.slice(
            0,
            10
          )}`
        );
        setError((error as Error).message);
        setIsLoading(false);
      }
    };

    fetchData(url);

    return () => {
      console.log(
        NuseFetchCycle,
        NuseEffectCycle,
        `🫣🫣🫣 ${url} - `,
        "fetch cleanup (before component dismounts -> should cancel ongoing requests"
      );
    };
  }, [authenticatedUser, refreshAccessToken, url]);

  return [data, isLoading, error];
};

export default useData;
