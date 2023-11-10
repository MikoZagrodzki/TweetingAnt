import requestApi from "./RequestApi";

export const getChatGpt = async (personality:string|null, tweet:string
    ) => {
    
        const body = {
            personality: personality,
            tweet: tweet
        }
    
      try {
        const response = await requestApi(
          "https://tweetingantdb.onrender.com/database/tweet_with_personality",
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

export default getChatGpt;
