import { requestApi } from "../Functionalities"

export const updateRetweetsIntensivity = async (loginNameTwitter:string, intensivity:number) => {
    const body = {
        loginNameTwitter: loginNameTwitter,
        intensivity: intensivity,
    }
    try {
    await requestApi('https://tweetingantdb-9ezx.onrender.com/twitterClass/updateRetweetsIntensivity', {
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

  export default updateRetweetsIntensivity