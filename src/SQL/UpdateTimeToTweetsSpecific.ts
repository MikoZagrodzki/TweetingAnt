import { requestApi } from "../Functionalities"

export const updateTimeToTweetsSpecific = async (loginNameTwitter: string, hours:number, minutes:number, updatedHours:number, updatedMinutes:number ) => {
  const body = {
      loginNameTwitter : loginNameTwitter,
      hours: hours,
      minutes: minutes,
      updatedHours: updatedHours,
      updatedMinutes: updatedMinutes,    
    }
    try {
    const response = await requestApi('https://tweetingantdb-9ezx.onrender.com/twitterClass/updateTimeToTweetsSpecific', {
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

  export default updateTimeToTweetsSpecific