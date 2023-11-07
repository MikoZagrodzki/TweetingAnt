
import requestApi from "./RequestApi";

export const updateTweetText = async (tweetUrl: string, tweetText : string 
) => {

    const body = {
        tweeturl: tweetUrl,
        tweettext : tweetText 
    }

  try {
    const response = await requestApi(
      "https://tweetingantdb.onrender.com/database/update_Scraped_Tweet_Text",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(body)
      }
    );
    return response.payload;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default updateTweetText;
