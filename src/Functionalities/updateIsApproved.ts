
import requestApi from "./RequestApi";

export const updateIsApproved = async (tweetUrl: string, isApproved: string , sqlId:number
) => {

    const body = {
        tweeturl: tweetUrl,
        isApproved: isApproved,
        sqlId: sqlId
    }

  try {
    const response = await requestApi(
      "https://tweetingantdb-9ezx.onrender.com/database/update_Scraped_Tweet_IsAprroved",
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

export default updateIsApproved;
