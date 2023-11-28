import React from 'react'
import classnames from 'classnames';
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";




function TweetAnalitycs() {
  const { currentUser }: any = useAuth();
  const navigate = useNavigate();





  const BUTTON_STYLING =classnames('text-xs sm:text-sm whitespace-nowrap bg-secondary font-semibold px-1 rounded-full border border-accent hover:bg-accent hover:text-white hover:border-primary shadow-md')
  const INFO_TEXT = classnames('text-xs md:text-sm whitespace-nowrap');
  const TWEET_TEXT = classnames('text-xs sm:text-sm');
  const BORDER_STYLING = classnames('border border-2 border-white border-opacity-30');
  const SHADOW_STYLING = classnames('shadow-md hover:shadow-xl');
  const BUTTON_SPECIAL = classnames(' bg-highlight rounded-md font-bold text-accent p-1 shadow-lg border-2 border-accent hover:text-white hover:border-highlight hover:bg-accent hover:shadow-2xl');
  

  return (
    <div id='TweetAnalyticsComponent' className={`w-screen min-h-screen flex flex-col items-center gap-10 mt-10`}>
      <h1>Tweet Analitycs</h1>
      <div className={`flex flex- row flex-wrap gap-2`}>
        {currentUser.email!=="maciek@maciek.maciek"&&
          <button className={`${BUTTON_STYLING}`} onClick={()=>{navigate('/main', { replace: true })}}>Main</button>
        }
        <button className={`${BUTTON_STYLING}`} onClick={()=>{navigate('/', { replace: true })}}>Content</button>
      </div>
        <div className={`w-11/12 max-w-lg flex flex-row flex-wrap justify-center gap-2 py-2 px-1 ${BORDER_STYLING} ${SHADOW_STYLING}`}>
          <input placeholder='Insert Your URL' className={`w-full pl-2 border border-accent whitespace-nowrap rounded-full focus:outline-secondary text-black ${TWEET_TEXT}  ${SHADOW_STYLING}`} />
            <select className={`${BUTTON_STYLING}`}>
            <option value=''>Tweet or Comment?</option>
            <option value=''>Tweet</option>
            <option value=''>Comment</option>
          </select>
          <button className={` ${BUTTON_STYLING}`} >Insert</button>
        </div>
    </div>
  )
}

export default TweetAnalitycs