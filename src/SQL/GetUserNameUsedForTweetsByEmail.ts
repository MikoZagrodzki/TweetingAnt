import { requestApi } from "../Functionalities"

export const getUserNameUsedForTweetsByEmail = async (email: string) => {
  const body = {
    email: email,
  };
  try {
    const response = await requestApi(
      "https://tweetingantdb-9ezx.onrender.com/database/user_Name_Used_For_Tweets_By_Email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(body),
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

export default getUserNameUsedForTweetsByEmail;
