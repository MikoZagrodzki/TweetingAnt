import { requestApi } from "../Functionalities"

export const checkUserContent = async (loginNameTwitter: string, username: string ) => {
    const body = {
        loginNameTwitter : loginNameTwitter,
        username : username,
       
    }
    try {
    const response = await requestApi('https://tweetingantdb-9ezx.onrender.com/database/check_User_Content', {
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
    // console.log(response.payload[0].exists)
    const exists = response.payload[0].exists
    return exists
    }catch(error){
        console.error(error)
        throw error
    }
  }

  export default checkUserContent