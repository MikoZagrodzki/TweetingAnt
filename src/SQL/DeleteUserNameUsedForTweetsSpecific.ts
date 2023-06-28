import { requestApi } from "../Functionalities"

export const deleteUserNameUsedForTweetsSpecific = async (loginNameTwitter: string, userNameUsedForTweets:string ) => {
    const body = {
        loginNameTwitter : loginNameTwitter,
        userNameUsedForTweets: userNameUsedForTweets,
    }
    try {
    const response = await requestApi('https://tweetingantdb.onrender.com/database/delete_User_Name_Used_For_Tweets_Specific', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body)

    })
    if (!response?.payload){
      throw new Error('No response from API')
    }
    return response
    }catch(error){
        console.error(error)
        throw error
    }
  }

  export default deleteUserNameUsedForTweetsSpecific