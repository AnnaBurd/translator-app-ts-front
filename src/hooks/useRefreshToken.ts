// import Config from "../../config.json";

// const useRefreshToken = () => {
//   const refresh = async () => {
//     try {
//       const response = await fetch(`${Config.API_URL}refresh`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       });

//       if (!response.ok) {
//         // TODO: what next?
//         throw new Error("Could Not Update Access - Please log in again");
//       }

//       const data = await response.json();
//       console.log(data);

//       setUser({
//         accessToken: data.accessToken,
//       });

//     } catch (error) {
//       console.log(error);
//       // TODO: what next?
//     }
//   };
// };

// export default useRefreshToken;
