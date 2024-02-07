import { requestApi } from "../Functionalities"

const getIntensivity = async () => {
  try {
    const response = await requestApi(
      "https://tweetingantdb-9ezx.onrender.com/twitterClass/getIntensivity",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      }
    );
    if (!response?.payload) {
      throw new Error("Response not exist");
    }
    return response.payload;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export default getIntensivity;
