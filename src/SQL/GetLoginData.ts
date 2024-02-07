import { requestApi } from "../Functionalities"

export const getLoginData = async () => {

    try {
        const response = await requestApi('https://tweetingantdb-9ezx.onrender.com/database/login_Data', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
    })
    return response.payload
    }catch(error){
        console.error(error)
        throw error
    }
  }

  export default getLoginData