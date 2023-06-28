import { requestApi } from "../Functionalities"

const getTimeToCommentsAllBatches = async () => {
  try {
    const response = await requestApi(
      "https://tweetingantdb.onrender.com/twitterClass/getTimeToCommentsAllBatches",
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
    const groupedComments = response.payload.reduce((acc: any, curr: any) => {
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

    const mappedResponse = Object.keys(groupedComments).map((loginnametwitter) => {
      return {
        loginnametwitter,
        commentsTime: groupedComments[loginnametwitter],
      };
    });
    // console.log(mappedResponse)
    return mappedResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export default getTimeToCommentsAllBatches;
