import React, { useEffect, useRef, useState } from "react";
import updateIsApproved from "../../../Functionalities/updateIsApproved";
import updateTweetText from "../../../Functionalities/updateTweetText";
import classnames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';



interface Props {
  imgSource: string | null;
  tweetUrl: string | null;
  tweetText: string;
  videoSource?: string | null;
  isApproved: string;
  originalTweetText: string

}

function Tweet(props: Props) {
  const { imgSource, tweetUrl, tweetText, videoSource, isApproved, originalTweetText } = props;
  const [approvalStatus, setApprovalStatus] = useState<string>("");
  const [displayedText, setDisplayedText] = useState<string>(tweetText);
  const [buttonText, setButtonText] = useState<string>('Original Text');
  const [isEditing, setIsEditing] = useState(false);
  const [isComparing, setIsComparing] = useState(false);



  const handleEdit = () => {
    setIsEditing(true);

  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleChange = (event:any) => {
    setDisplayedText(event.target.value);
  };

  const handleApprove = async () => {
    if (tweetUrl) {
      await updateIsApproved(tweetUrl, "approved");
      await updateTweetText(tweetUrl, displayedText);
      setApprovalStatus("approved");
    }
  };

  const handleDecline = async () => {
    if (tweetUrl) {
      await updateIsApproved(tweetUrl, "declined");
      setApprovalStatus("declined");
    }
  };
  const tweetStyle =
    approvalStatus === "approved"
      ? { backgroundColor: "#e8fff4" }
      : approvalStatus === "declined"
      ? { backgroundColor: "#ffe8e8" }
      : {};

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
  const INFO_TEXT = classnames('text-xs md:text-sm')
  const TWEET_TEXT = classnames('text-xs sm:text-sm')
  const BORDER_STYLING = classnames('border border-2 border-secondary')
  return (
    <div
      className={`flex flex-col items-center gap-1 w-11/12 pb-5 max-w-sm p-2 sm:p-3 ${BORDER_STYLING}`}
      style={tweetStyle}
    >
         <a className={`${INFO_TEXT} font-bold`}>{isComparing ? 'Comparing' : (buttonText === 'Original Text' ? 'Rephrased text by ChatGPT' : 'Original Text')}</a>
         {isComparing ? (
        <div className="flex gap-3">
          <div>
            <h2 className={INFO_TEXT}>Original Text</h2>
            <p className={TWEET_TEXT}>{originalTweetText}</p>
          </div>
          <div>
            <h2 className={INFO_TEXT}>ChatGpt Text</h2>
            <p className={TWEET_TEXT}>{tweetText}</p>
          </div>
        </div>
      ) : isEditing ? (
        <TextareaAutosize
          value={displayedText || ''}
          onChange={handleChange}
          minRows={2}
          className={`${TWEET_TEXT} w-full m-1 resize-none text-center ${BORDER_STYLING} focus:outline-primary`}
        />
      ) : (
        <h1 className={`${TWEET_TEXT} w-full`}>{displayedText}</h1>
      )}
       {imgSource && (
        <img
          src={imgSource}
          // style={{ maxWidth: "512px", maxHeight: "512px" }}
          className="w-full"
        />
      )}
      {videoSource && (
        <video 
        // style={{ maxWidth: "512px", maxHeight: "512px" }} 
        className="w-full"
        controls>
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div id="tweetButtonContainer" className="flex flex-row gap-1 flex-wrap justify-center">
        <button className={BUTTON_STYLING} onClick={handleApprove}>Approve</button>
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
