import React, { useEffect, useRef, useState } from "react";
import updateIsApproved from "../../../Functionalities/updateIsApproved";
import updateTweetText from "../../../Functionalities/updateTweetText";
import classnames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';


interface TweetSql {
  id: number;
  tweettext: string;
  tweetpictureurl: string | null;
  tweeturl: string;
  tweettextchatgpt: string;
  tweetvideourl: string | null;
  isapproved: string;
  personality: string | null;
  tweettype: string | null;
}


interface Props {
  sqlId:number;
  imgSource: string | null;
  tweetUrl: string | null;
  tweetText: string;
  videoSource?: string | null;
  isApproved: string;
  originalTweetText: string;

  index:number;
  tweetsDataState:TweetSql[];
  setTweetsDataState: React.Dispatch<React.SetStateAction<[] | TweetSql[]>>;

  toggleUseEffectForTweets:boolean;
  setToggleUseEffectForTweets:React.Dispatch<React.SetStateAction<|boolean>>;
}

function Tweet(props: Props) {
  let {sqlId, imgSource, tweetUrl, tweetText, videoSource, isApproved, originalTweetText, tweetsDataState, setTweetsDataState, index, toggleUseEffectForTweets, setToggleUseEffectForTweets} = props;
  const [approvalStatus, setApprovalStatus] = useState<string>("");
  const [displayedText, setDisplayedText] = useState<string>(tweetText);
  const [buttonText, setButtonText] = useState<string>('Original Text');
  const [isEditing, setIsEditing] = useState(false);
  const [isComparing, setIsComparing] = useState(false);

  const [isTextareaFocused, setIsTextareaFocused] = useState(false);



  
  const handleEdit = () => {
    setIsEditing(true);
    
  };
  
  const handleSave = async () => {
    setIsEditing(false);
    if(tweetUrl){
      await updateTweetText(tweetUrl, displayedText, sqlId);
    }
  };
  
  const handleChange = (event:any) => {
    setDisplayedText(event.target.value);
  };
  
  const handleApprove = async () => {
    if (tweetUrl) {
      await updateIsApproved(tweetUrl, "approved", sqlId);
      await updateTweetText(tweetUrl, displayedText, sqlId);
      setApprovalStatus("approved");
      setToggleUseEffectForTweets(!toggleUseEffectForTweets)
    }
  };

  const handleDecline = async () => {
    if (tweetUrl) {
      await updateIsApproved(tweetUrl, "declined", sqlId);
      setApprovalStatus("declined");
      setToggleUseEffectForTweets(!toggleUseEffectForTweets)
    }
  };
  
  const toggleText = () => {
    if (displayedText === tweetText) {
      setDisplayedText(originalTweetText);
      setButtonText('ChatGPT Text');
    } else {
      setDisplayedText(tweetText);
      setButtonText('Original Text');
    }
  }; 
  const handleCompare = () => {
    setIsComparing(!isComparing);
  };


  const BUTTON_STYLING =classnames('text-xs sm:text-sm  whitespace-nowrap bg-secondary font-semibold px-1 rounded-sm border border-accent hover:bg-accent hover:text-white hover:border-primary shadow-md')
  const INFO_TEXT = classnames('text-xs md:text-sm whitespace-nowrap')
  const TWEET_TEXT = classnames('text-xs sm:text-sm')
  const BORDER_STYLING = classnames('border border-2 border-secondary')
  const SHADOW_STYLING = classnames('shadow-md hover:shadow-xl')
  return (
    <div
      id={`Tweet ${index+1}`}
      className={`flex flex-col items-center gap-1 w-11/12 pb-5 max-w-md p-2 sm:p-3 ${BORDER_STYLING} ${SHADOW_STYLING}`}
    >
         <a className={`${INFO_TEXT} font-bold`}>{isComparing ? 'Comparing' : (buttonText === 'Original Text' ? 'Rephrased text by ChatGPT' : 'Original Text')}</a>
         {isComparing ? (
        <div className={`flex flex-row gap-3 w-full justify-between `}>
          <div className={`flex flex-col gap-1 min-w-1/3 ${isEditing?``:""}`}>
            <h2 className={INFO_TEXT}>Original Text</h2>
            <p className={`${TWEET_TEXT}  ${isEditing?`h-full px-1 ${BORDER_STYLING} opacity-80`:``}`}>{originalTweetText}</p>
          </div>
          {isEditing ? (
              <div className="flex flex-col gap-1 min-w-1/2">
                <h2 className={INFO_TEXT}>ChatGpt Text</h2>
                <TextareaAutosize
                  value={displayedText || ''}
                  onChange={handleChange}
                  minRows={2}
                  onFocus={() => setIsTextareaFocused(true)}
                  onBlur={() => setIsTextareaFocused(false)}
                  className={`${TWEET_TEXT} w-full resize-none text-center px-1 ${BORDER_STYLING} focus:outline-primary`}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-1 min-w-1/3 group relative">
                <h2 className={`${INFO_TEXT}`}>ChatGpt Text</h2>
                <p className={`${TWEET_TEXT} transition-opacity opacity-100 group-hover:opacity-70`}>{tweetText}</p>
                <div className="hidden group-hover:block absolute inset-0 mx-auto bg-white bg-opacity-75">
                  <button className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-highlight rounded-md font-bold text-accent p-1 shadow-lg border-2 border-accent hover:text-highlight hover:border-highlight hover:bg-accent hover:shadow-2xl`}>Re-Rephrase</button>
                </div>
              </div>

          )}
        </div>
      ) : isEditing ? (
        <TextareaAutosize
          value={displayedText || ''}
          onChange={handleChange}
          minRows={2}
          className={`${TWEET_TEXT} w-full m-1 resize-none text-center ${BORDER_STYLING} focus:outline-primary`}
        />
      ) : (
        <h1 className={`${TWEET_TEXT} w-full group relative`}>{displayedText}
          <div className="hidden group-hover:block absolute inset-0 mx-auto bg-white bg-opacity-75">
          <button className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-highlight rounded-md font-bold text-accent p-1 shadow-lg border-2 border-accent hover:text-highlight hover:border-highlight hover:bg-accent hover:shadow-2xl`}>Re-Rephrase</button>
        </div></h1>
        
      )}
       {imgSource && (
        <img
          src={imgSource}
          className="w-full"
        />
      )}
      {videoSource && (
        <video 
        className="w-full"
        controls>
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div id="tweetButtonContainer" className="flex flex-row gap-1 flex-wrap justify-center mt-2">
        {isApproved==='pending'&&(<button className={BUTTON_STYLING} onClick={handleApprove}>Approve</button>)}
        {isEditing ? (
          <button className={BUTTON_STYLING} onClick={handleSave}>Save</button>
        ) : (
          <button className={BUTTON_STYLING} onClick={handleEdit}>Edit</button>
        )}
        <button className={BUTTON_STYLING} onClick={handleDecline}>Decline</button>
        <button className={BUTTON_STYLING} onClick={toggleText}>{buttonText}</button>
        <button className={BUTTON_STYLING} onClick={handleCompare}>Compare</button>
      </div>
    </div>
  );
}

export default Tweet;
