import requestApi from "./RequestApi";

export const insertAnalyticsUrlOrUpdateDate = async (url: string, tweetOrComment:string
    ) => {

        const body = {
            url: url,
            tweetOrComment: tweetOrComment
        }
    
      try {
        const response = await requestApi(
          "https://tweetingantdb.onrender.com/database/insert_Analytics_Url_Or_Update_Date",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(body)
          }
        );
        return response.payload[0];
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    

export default insertAnalyticsUrlOrUpdateDate;
