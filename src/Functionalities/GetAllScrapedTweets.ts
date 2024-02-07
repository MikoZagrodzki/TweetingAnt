
 import requestApi from "./RequestApi";

export const getAllScrapedTweets = async (
) => {
  try {
    const response = await requestApi(
      "https://tweetingantdb-9ezx.onrender.com/database/get_All_Scraped_tweets",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response.payload;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAllScrapedTweets;
