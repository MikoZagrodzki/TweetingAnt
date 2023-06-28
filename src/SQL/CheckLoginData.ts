import { requestApi } from "../Functionalities"

export const checkLoginData = async (loginNameTwitter: string, passwordTwitter: string ) => {
    const body = {
        loginNameTwitter : loginNameTwitter,
        passwordTwitter : passwordTwitter,
       
    }
    try {
    const response = await requestApi('https://tweetingantdb.onrender.com/database/check_Login_Data', {
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
    const exists = response.payload[0].exists
    return exists
    }catch(error){
        console.error(error)
        throw error
    }
  }

  export default checkLoginData