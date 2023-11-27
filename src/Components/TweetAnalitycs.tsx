import React from 'react'
import classnames from 'classnames';


function TweetAnalitycs() {



  const BUTTON_STYLING =classnames('text-xs sm:text-sm  whitespace-nowrap bg-secondary font-semibold px-1 rounded-sm border border-accent hover:bg-accent hover:text-white hover:border-primary shadow-md');
  const INFO_TEXT = classnames('text-xs md:text-sm whitespace-nowrap');
  const TWEET_TEXT = classnames('text-xs sm:text-sm');
  const BORDER_STYLING = classnames('border border-2 border-secondary');
  const SHADOW_STYLING = classnames('shadow-md hover:shadow-xl');
  const BUTTON_SPECIAL = classnames(' bg-highlight rounded-md font-bold text-accent p-1 shadow-lg border-2 border-accent hover:text-white hover:border-highlight hover:bg-accent hover:shadow-2xl');
  

  return (
    <div id='TweetAnalyticsComponent' className={`w-screen min-h-screen flex flex-col items-center`}>
        <div className={`w-11/12 max-w-md flex flex-col mt-10 gap-2 items-center py-2 ${BORDER_STYLING} ${SHADOW_STYLING}`}>
            <h1>Tweet Analitycs</h1>
            <div className={`w-11/12 flex flex-row gap-2 `}>
                <input placeholder='Insert Your URL' className={`w-full pl-2 border border-accent whitespace-nowrap rounded-sm focus:outline-primary ${TWEET_TEXT}  ${SHADOW_STYLING}`} />
                <button className={` ${BUTTON_STYLING}`} >Insert</button>
            </div>
        </div>
    </div>
  )
}

export default TweetAnalitycs