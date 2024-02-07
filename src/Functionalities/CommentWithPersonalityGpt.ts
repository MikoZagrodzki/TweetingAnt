import requestApi from "./RequestApi";

export const CommentWithPersonalityGpt = async (personality:string|null, tweet:string
    ) => {
    
        const body = {
            personality: personality,
            tweet: tweet
        }
    
      try {
        const response = await requestApi(
          "https://tweetingantdb-9ezx.onrender.com/database/comment_with_personality",
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

export default CommentWithPersonalityGpt;
