import { requestApi } from "../Functionalities"

export const deleteUserContentSpecific = async (loginNameTwitter: string, userContent:string ) => {
    const body = {
        loginNameTwitter : loginNameTwitter,
        userContent: userContent,
    }
    try {
    const response = await requestApi('https://tweetingantdb-9ezx.onrender.com/database/delete_User_Content_Specific', {
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

  export default deleteUserContentSpecific