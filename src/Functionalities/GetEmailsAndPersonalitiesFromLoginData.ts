import React from 'react'
import requestApi from './RequestApi';

export const getEmailsAndPersonalitiesFromLoginData = async (
    ) => {
        try {
          const response = await requestApi(
            "https://tweetingantdb-9ezx.onrender.com/database/get_Emails_And_Personalities_From_Login_Data",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
          return response.payload;
        } catch (error) {
          console.error(error);
          throw error;
        }
      };
      

export default getEmailsAndPersonalitiesFromLoginData