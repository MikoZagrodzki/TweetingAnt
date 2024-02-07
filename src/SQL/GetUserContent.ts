import { requestApi } from "../Functionalities"

export const getUserContent = async () => {
  try {
    const response = await requestApi(
      "https://tweetingantdb-9ezx.onrender.com/database/user_Content_All",
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
    const groupedContent = response.payload.reduce((acc: any, curr: any) => {
      if (acc[curr.loginnametwitter]) {
        acc[curr.loginnametwitter].push(curr.usercontent);
      } else {
        acc[curr.loginnametwitter] = [curr.usercontent];
      }
      return acc;
    }, {});

    const mappedResponse = Object.keys(groupedContent).map((loginnametwitter) => {
      return {
        loginnametwitter,
        usercontent: groupedContent[loginnametwitter],
      };
    });

    // console.log(mappedResponse)
    return mappedResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getUserContent;
