import { requestApi } from "../Functionalities"

export const getPersonalityList = async () => {
  try {
    const response = await requestApi("https://tweetingantdb-9ezx.onrender.com/twitterClass/personality_List", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    if (!response?.payload) {
      throw new Error("Response not exist");
    }

    const personalityList = response.payload.map((listItem: any) => {
      return listItem.personality
    })

    return personalityList
    
  } catch (error) {
    console.error(error);
  }
};

export default getPersonalityList;
