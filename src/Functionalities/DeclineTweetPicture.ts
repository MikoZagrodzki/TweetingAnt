import requestApi from "./RequestApi";

export const declineTweetPicture = async (tweetUrl: string|null, sqlId:number
    ) => {

        const body = {
            tweeturl: tweetUrl,
            sqlId: sqlId
        }
    
      try {
        const response = await requestApi(
          "https://tweetingantdb.onrender.com/database/update_Scraped_Tweet_Picture",
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
    

export default declineTweetPicture;
