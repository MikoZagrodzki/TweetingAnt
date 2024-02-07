import { requestApi } from "../Functionalities"

export const getUserNameUsedForTweets = async () => {
  try {
    const response = await requestApi(
      "https://tweetingantdb-9ezx.onrender.com/database/user_Name_Used_For_Tweets_All",
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
    const groupedUsernames = response.payload.reduce((acc: any, curr: any) => {
      if (acc[curr.loginnametwitter]) {
        acc[curr.loginnametwitter].push(curr.usercontent);
      } else {
        acc[curr.loginnametwitter] = [curr.usercontent];
      }
      return acc;
    }, {});

    const mappedResponse = Object.keys(groupedUsernames).map((loginnametwitter) => {
      return {
        loginnametwitter,
        usercontent: groupedUsernames[loginnametwitter],
      };
    });
    // console.log(mappedResponse)
    return mappedResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getUserNameUsedForTweets;
