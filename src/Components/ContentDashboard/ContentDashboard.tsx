import React, { useEffect, useState } from 'react'
import Tweet from './Tweet/Tweet'
import getAllScrapedTweets from '../../Functionalities/GetAllScrapedTweets'

interface Tweet {
    tweetpictureurl: string|null;
    tweeturl: string;
    tweettextchatgpt: string|null;
    tweetvideourl: string | null; 
    isapproved: boolean;
}

function ContentDashboard() {
  const [tweets, setTweets] = useState<Tweet[] | []>([])
  
 const getTweets = async () => {
  const tweetsData = await getAllScrapedTweets();
  setTweets(tweetsData);
 }

    useEffect(() => {
      getTweets();
    }, [])
    
  

  return (
    <div className=' min-h-screen w-screen mt-10 mb-10 flex flex-col items-center gap-y-10'>
        <ul id='tweetToRephrase' className='flex flex-col items-center gap-3'>
            {tweets.map((tweet)=> ( <Tweet imgSource={tweet.tweetpictureurl} tweetText={tweet.tweettextchatgpt} tweetUrl={tweet.tweeturl} videoSource={tweet.tweetvideourl} isApproved={tweet.isapproved}></Tweet>))}
        </ul>
        <ul className=''>
            <div id='tweetRephrased' className='flex flex-col items-center'>
            </div>
        </ul>
    </div>
  )
}

export default ContentDashboard