import { requestApi } from "../Functionalities"

export const getTimeToTweetsAllBatches = async () => {

  try {
    const response = await requestApi(
      "https://tweetingantdb-9ezx.onrender.com/twitterClass/getTimeToTweetsAllBatches",
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
    const groupedTweets = response.payload.reduce((acc: any, curr: any) => {
      if (acc[curr.loginnametwitter]) {
        acc[curr.loginnametwitter].push({
          hours: curr.hours,
          minutes: curr.minutes,
        });
      } else {
        acc[curr.loginnametwitter] = [
          {
            hours: curr.hours,
            minutes: curr.minutes,
          },
        ];
      }
      return acc;
    }, {});

    const mappedResponse = Object.keys(groupedTweets).map((loginnametwitter) => {
      return {
        loginnametwitter,
        tweetsTime: groupedTweets[loginnametwitter],
      };
    });
    // console.log(mappedResponse)
    return mappedResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getTimeToTweetsAllBatches;
