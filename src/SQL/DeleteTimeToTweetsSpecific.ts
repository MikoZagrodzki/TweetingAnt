import { requestApi } from "../Functionalities"

export const deleteTimeToTweetsSpecific = async (loginNameTwitter: string, hours:number, minutes:number ) => {
    const body = {
        loginNameTwitter : loginNameTwitter,
        hours: hours,
        minutes: minutes,    
    }
    try {
    const response = await requestApi('https://tweetingantdb.onrender.com/twitterClass/deleteTimeToTweetsSpecific', {
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

  export default deleteTimeToTweetsSpecific