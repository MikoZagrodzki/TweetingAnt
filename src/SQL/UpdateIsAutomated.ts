import { requestApi } from "../Functionalities"

export const updateIsAutomated = async (loginNameTwitter:string, isAutomated:boolean) => {
    const body = {
        loginNameTwitter: loginNameTwitter,
        isAutomated : isAutomated,
    }
    try {
    await requestApi('https://tweetingantdb-9ezx.onrender.com/twitterClass/UpdateIsAutomated', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body)

    })
    }catch(error){
        console.error(error)
        throw error
    }
  }

  export default updateIsAutomated