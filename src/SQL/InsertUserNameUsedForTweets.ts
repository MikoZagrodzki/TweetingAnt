import { requestApi } from "../Functionalities"

export const insertUserNameUsedForTweets = async (formData: {}[]) => {
    // const body = {
    //     email: email,
    //     loginNameTwitter : loginNameTwitter,
    //     username : username,
       
    // }
    try {
    await requestApi('https://tweetingantdb.onrender.com/database/insert_User_Name_Used_For_Tweets', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(formData)
    })
    }catch(error){
        console.error(error)
        throw error
    }
  }

  export default insertUserNameUsedForTweets