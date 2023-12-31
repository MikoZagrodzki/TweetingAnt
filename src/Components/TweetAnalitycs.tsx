import React, { useState } from 'react'
import { useAuth } from "../AuthContext";
import insertAnalyticsUrlOrUpdateDate from '../Functionalities/InsertAnalyticsUrlOrUpdateDate';
import useScrollToTopAndNavigate from './UseScrollToTopAndNavigate';
import { BORDER_STYLING, BUTTON_STYLING, SHADOW_STYLING, TWEET_TEXT } from '../tailwindCustomStyles';




function TweetAnalitycs() {
  const { currentUser }: any = useAuth();
  const navigate = useScrollToTopAndNavigate();

  const [tweetOrComment, setTweetOrComment] = useState<string>("")
  const [url, setUrl] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [displayedRespondse, setDisplayedResponse] = useState<string>("");

  const handleTweetOrComment = (selectedValue:string) => {
    setTweetOrComment(selectedValue);
  }

  const handleInputUrlValue = (typedValue:string) => {
    setUrl(typedValue.trim());
  }

  const handleInsertUrl = async () => {
    try {
      setDisplayedResponse("");
      if (url.indexOf("http") !== -1 && url.indexOf("/status/") !== -1) {
        if(tweetOrComment===""){
          alert("You must select Tweet or Comment!");
          return;
        }
        const backendCall = await insertAnalyticsUrlOrUpdateDate(url, tweetOrComment);
        const tweetOrCommentCapitalised = tweetOrComment.charAt(0).toUpperCase() + tweetOrComment.slice(1);
        if(backendCall.whentoupdate && backendCall.whentoupdate===null){
          setIsVisible(true)
          setDisplayedResponse(`${tweetOrCommentCapitalised} succesfully added.`)
        } else {
          setIsVisible(true)
          setDisplayedResponse(`${tweetOrCommentCapitalised} lifespan extended for 24h from now.`)
        }
        setTweetOrComment("");
        setUrl("");
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      } else {
        alert("The link must be a correct Twitter link");
        return;
      }
    } catch (error) {
      console.error(error)
    }
  };
    

  return (
    <div id='TweetAnalyticsComponent' className={`w-screen max-h-screen  flex flex-col items-center gap-10 mt-10`}>
      <h1>Tweet Analitycs</h1>
      <div className={`flex flex- row flex-wrap gap-2`}>
        {currentUser.email==="admin@admin.admin"&&
          <button className={`${BUTTON_STYLING}`} onClick={()=>{navigate('/main')}}>Main</button>
        }
        <button className={`${BUTTON_STYLING}`} onClick={()=>{navigate('/')}}>Content</button>
      </div>
        <div className={`w-11/12 max-w-lg flex flex-row flex-wrap justify-center gap-2 py-2 px-1 ${BORDER_STYLING} ${SHADOW_STYLING}`}>
          <input type='url' placeholder='Insert Your URL' value={url} onChange={(e)=>handleInputUrlValue(String(e.target.value))} className={`w-full pl-2 border border-accent whitespace-nowrap rounded-full focus:outline-secondary text-black ${TWEET_TEXT}  ${SHADOW_STYLING}`} />
          <select onChange={(e)=> handleTweetOrComment(String(e.target.value))} value={tweetOrComment} className={`${BUTTON_STYLING}`}>
            <option value=''>Tweet or Comment?</option>
            <option key='tweet' value='tweet'>Tweet</option>
            <option key='comment' value='comment'>Comment</option>
          </select>
          <button className={`${BUTTON_STYLING}`} onClick={handleInsertUrl} >Insert</button>
        </div>
        {isVisible&&
            <p>{displayedRespondse}</p>
        }
    </div>
  )
}

export default TweetAnalitycs