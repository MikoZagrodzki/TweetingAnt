import React, { useState } from "react";
import updateIsApproved from "../../../Functionalities/updateIsApproved";
import updateTweetText from "../../../Functionalities/updateTweetText";

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

  return (
    <div
      className="flex flex-col items-center w-3/4 text-xs gap-1"
      style={tweetStyle}
    >
         <a>{isComparing ? 'Comparing' : (buttonText === 'Original Text' ? 'Rephrase text by ChatGPT' : 'Original Text')}</a>
         {isComparing ? (
        <div className="flex gap-3">
          <div>
            <h2>Original Text</h2>
            <p>{originalTweetText}</p>
          </div>
          <div>
            <h2>ChatGpt Text</h2>
            <p>{tweetText}</p>
          </div>
        </div>
      ) : isEditing ? (
        <textarea
          value={displayedText || ''}
          onChange={handleChange}
          rows={10}
          cols={50}
        />
      ) : (
        <h1>{displayedText}</h1>
      )}
       {imgSource && (
        <img
          src={imgSource}
          style={{ maxWidth: "512px", maxHeight: "512px" }}
        />
      )}
      {videoSource && (
        <video style={{ maxWidth: "512px", maxHeight: "512px" }} controls>
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div id="tweetButtonContainer" className="flex flex-row gap-3">
        <button onClick={handleApprove}>Approve</button>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
        <button onClick={handleDecline}>Decline</button>
        <button onClick={toggleText}>{buttonText}</button>
        <button onClick={handleCompare}>Compare</button>
      </div>
    </div>
  );
}

export default Tweet;
