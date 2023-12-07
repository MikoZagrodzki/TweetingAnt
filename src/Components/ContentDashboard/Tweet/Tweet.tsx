import React, { useEffect, useState } from 'react';
import updateIsApproved from '../../../Functionalities/updateIsApproved';
import updateTweetText from '../../../Functionalities/updateTweetText';
import classnames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';
import getChatGpt from '../../../Functionalities/GetChatGpt';
import declineTweetPicture from '../../../Functionalities/DeclineTweetPicture';
import declineTweetVideo from '../../../Functionalities/DeclineTweetVideo';

//@ts-ignore
import { Waypoint } from 'react-waypoint';
//@ts-ignore
import { ReactComponent as RepliesIcon } from '../Tweet/repliesIcon.svg';
//@ts-ignore
import { ReactComponent as LikesIcon } from '../Tweet/likeIcon.svg';
//@ts-ignore
import { ReactComponent as RepostsIcon } from '../Tweet/repostIcon.svg';
//@ts-ignore
import { ReactComponent as ViewsIcon } from '../Tweet/viewsIcon.svg';
//@ts-ignore
import { ReactComponent as BookmarsIcon } from '../Tweet/bookmarkIcon.svg';
import FadeComponentAnimation from '../../FadeComponentAnimation';
import {
  BORDER_OUTSIDE_STYLING,
  BORDER_STYLING,
  BUTTON_SPECIAL,
  BUTTON_STYLING,
  INFO_TEXT,
  SHADOW_STYLING,
  TWEET_TEXT,
} from '../../../tailwindCustomStyles';
import CommentWithPersonalityGpt from '../../../Functionalities/CommentWithPersonalityGpt';

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
  time: string | null;
  userminiimageurl: string | null;
  twitterusername: string | null;
  replies: number | null;
  reposts: number | null;
  likes: number | null;
  bookmarks: number | null;
  views: number | null;
  email: string;
}

interface Props {
  sqlId: number;
  imgSource: string | null;
  tweetUrl: string | null;
  tweetText: string;
  videoSource?: string | null;
  isApproved: string;
  originalTweetText: string;
  personality: string | null;
  index: number;
  filteredTweetsDataState: TweetSql[];
  setFilteredTweetsDataState: React.Dispatch<React.SetStateAction<[] | TweetSql[]>>;
  userminiimageurl: string | null;
  twitterusername: string | null;
  replies: number | null;
  reposts: number | null;
  likes: number | null;
  bookmarks: number | null;
  views: number | null;
  tweetType: string | null;
  dateAdded: string | null;
  setBaseTweets: React.Dispatch<React.SetStateAction<[] | TweetSql[]>>;
  baseTweets: TweetSql[];
  email: string;
}

function Tweet(props: Props) {
  let {
    sqlId,
    imgSource,
    tweetUrl,
    tweetText,
    videoSource,
    isApproved,
    originalTweetText,
    personality,
    filteredTweetsDataState,
    setFilteredTweetsDataState,
    index,
    userminiimageurl,
    twitterusername,
    replies,
    reposts,
    likes,
    bookmarks,
    views,
    tweetType,
    dateAdded,
    setBaseTweets,
    baseTweets,
    email,
  } = props;
  const [stateOriginalText, setStateOriginalText] = useState<string>(originalTweetText);
  const [stateGptText, setStateGptText] = useState<string>(tweetText);
  const [buttonText, setButtonText] = useState<string>('Original Text');
  const [isEditing, setIsEditing] = useState(false);
  const [videoSourceState, setVideoSourceState] = useState<string | null | undefined>(videoSource);
  const [imageSourceState, setImageSourceState] = useState<string | null | undefined>(imgSource);
  const [hideButton, setHideButton] = useState('');
  const [stateGptValueBeforeEdit, setStateGptValueBeforeEdit] = useState<string>('');

  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);
  const handleEnterViewport = () => {
    setIsContentVisible(true);
  };

  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  const handleMediaEnter = () => {
    setIsMediaLoaded(true);
  };

  const handleCancelButton = () => {
    setIsEditing(false);
    setStateGptText(stateGptValueBeforeEdit);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setStateGptValueBeforeEdit(stateGptText);
  };

  const handleSave = async () => {
    if (buttonText === 'ChatGPT Text') {
      setHideButton('hidden');
      if (stateOriginalText === originalTweetText) {
        setStateGptText(originalTweetText);
      } else {
        setStateGptText(stateOriginalText);
      }
    }
    setIsEditing(false);
    if (tweetUrl) {
      if (buttonText === 'ChatGPT Text') {
        if (stateOriginalText === originalTweetText) {
          await updateTweetText(tweetUrl, originalTweetText, sqlId);
        } else {
          await updateTweetText(tweetUrl, stateGptText, sqlId);
        }
      } else {
        await updateTweetText(tweetUrl, stateGptText, sqlId);
      }
    }
  };

  const handleTextAreaChange = (event: any) => {
    if (buttonText === 'ChatGPT Text') {
      if (stateOriginalText === originalTweetText && event.target.value !== originalTweetText) {
        setStateOriginalText(originalTweetText); // Set stateOriginalText to originalTweetText
        setStateGptText(event.target.value); // Set GPT text to user modifications
        setButtonText('Original Text'); // Set the button text to "Original Text" once the user starts modifying
      } else {
        const hasOriginalText = stateGptText.includes(originalTweetText);
        if (!hasOriginalText) {
          setStateGptText(originalTweetText + event.target.value); // Combine original text and user modifications
        } else {
          // setStateOriginalText(originalTweetText);
          setStateGptText(event.target.value);
        }
      }
    } else {
      setStateGptText(event.target.value);
    }
  };

  const handleApprove = async () => {
    if (tweetUrl) {
      await updateIsApproved(tweetUrl, 'approved', sqlId);
      await updateTweetText(tweetUrl, stateGptText, sqlId);
      // Create a new array with the updated data
      const updatedTweetsDataState = [...filteredTweetsDataState];
      updatedTweetsDataState[index].tweettextchatgpt = stateGptText;
      updatedTweetsDataState[index].isapproved = 'approved';
      // Set the state with the new array
      // setBaseTweets(updatedTweetsDataState);
      setFilteredTweetsDataState(updatedTweetsDataState);
    }
  };

  const handleDecline = async () => {
    if (tweetUrl) {
      await updateIsApproved(tweetUrl, 'declined', sqlId);
      // Create a new array with the updated data
      const updatedTweetsDataState = [...filteredTweetsDataState];
      updatedTweetsDataState[index].isapproved = 'declined';
      // Set the state with the new array
      // setBaseTweets(updatedTweetsDataState);
      setFilteredTweetsDataState(updatedTweetsDataState);
    }
  };

  const toggleDisplayedText = () => {
    if (buttonText === 'ChatGPT Text') {
      setButtonText('Original Text');
    }
    if (buttonText === 'Original Text') {
      setButtonText('ChatGPT Text');
    }
  };

  const declineImage = async () => {
    await declineTweetPicture(tweetUrl, sqlId);
    setImageSourceState(null);
    const updatedTweetsDataState = [...filteredTweetsDataState];
    updatedTweetsDataState[index].tweetpictureurl = null;
    // Set the state with the new array
    // setBaseTweets(updatedTweetsDataState);
    setFilteredTweetsDataState(updatedTweetsDataState);
  };

  const declineVideo = async () => {
    await declineTweetVideo(tweetUrl, sqlId);
    setVideoSourceState(null);
    const updatedTweetsDataState = [...filteredTweetsDataState];
    updatedTweetsDataState[index].tweetvideourl = null;
    // Set the state with the new array
    // setBaseTweets(updatedTweetsDataState);
    setFilteredTweetsDataState(updatedTweetsDataState);
  };

  const handleRephrase = async () => {
    let gptResponse;
    if(tweetType==='comment'){
      gptResponse = await CommentWithPersonalityGpt(personality, `${originalTweetText === stateGptText ? originalTweetText : stateGptText}`);
    }else{
      gptResponse = await getChatGpt(personality, `${originalTweetText === stateGptText ? originalTweetText : stateGptText}`);
    }

    // if (gptResponse === stateGptText || gptResponse === tweetText){
    //   gptResponse = await getChatGpt(personality, `RE-REPHRASE THAT ONCE MORE: ${gptResponse}`);
    // }

    if (gptResponse && gptResponse.startsWith('"')) {
      gptResponse = gptResponse.substring(1);
    }
    if (gptResponse && gptResponse.endsWith('"')) {
      gptResponse = gptResponse.slice(0, -1);
    }
    if (gptResponse && tweetUrl) {
      setStateGptText(gptResponse);
      setButtonText('Original Text');
      await updateTweetText(tweetUrl, String(gptResponse), sqlId);
    }
    console.log(gptResponse);
    setHideButton('');
  };

  /////// FORMATING NUMBERS ///////////////////////////////////////////////////////////////
  function formatNumber(number: number): string {
    if (number < 1000) {
      return String(number);
    }

    const suffixes = ['', 'k', 'm', 'b', 't'];
    const suffixNum = Math.floor(('' + number).length / 3);
    let shortValue: number = parseFloat((suffixNum !== 0 ? number / Math.pow(1000, suffixNum) : number).toPrecision(2));

    if (shortValue % 1 !== 0) {
      shortValue = parseFloat(shortValue.toFixed(1)); // Convert to number
    }

    return String(shortValue) + suffixes[suffixNum];
  }
  /////// END OF FORMATING NUMBERS ///////////////////////////////////////////////////////////////

  //////// DATE ////////////////////////////////////////////////////////
  if (dateAdded) {
    const date = new Date(dateAdded);
    dateAdded = date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false, //24h
    });
  }
  //////// END OF DATE ////////////////////////////////////////////////////////

  return (
    // {/* // TWEET CONTAINER */}
    <FadeComponentAnimation idToTriggerAnimation={`${sqlId} Tweet`}>
      <div
        key={sqlId}
        id={`${sqlId} Tweet`}
        // className={`${isContentVisible ? `flex flex-row  gap-1 w-11/12 pb-5 max-w-lg  p-2 sm:p-3 justify-center ${BORDER_OUTSIDE_STYLING} ${SHADOW_STYLING}`:'hidden'}`}
        className={`flex flex-row  gap-1 w-11/12 pb-5 max-w-lg  p-2 sm:p-3  justify-center ${
          isContentVisible && `${BORDER_OUTSIDE_STYLING} ${SHADOW_STYLING}`
        }`}
      >
        {isContentVisible && (userminiimageurl || email || personality) && (
          <div className={`flex flex-col w-1/12  ${userminiimageurl ? 'justify-between' : 'justify-center'} items-center`}>
            {isContentVisible && userminiimageurl && (
              <a className='max-h-6 sm:max-h-7 md:max-h-9 '  href={`${tweetUrl}`} target='_blank'>
              <img src={userminiimageurl} alt={`${twitterusername} picture`} className='max-h-6 sm:max-h-7 md:max-h-9 rounded-full' />
              </a>
            )}
            {(email || personality) && (
              <div className={`flex flex-col gap-20  ${userminiimageurl ? 'h-4/6' : ''}`}>
                {email && <p className={`transform -rotate-90 writing-mode-vertical-rl ${INFO_TEXT}  scale-x-75 scale-y-50 text-gray-600 `}>{`${email}`}</p>}
                {personality && (
                  <p className={`transform -rotate-90 writing-mode-vertical-rl ${INFO_TEXT}  scale-x-75 scale-y-50 text-gray-600`}>{`${personality}`}</p>
                )}
              </div>
            )}
          </div>
        )}
        {!isContentVisible && <Waypoint onEnter={handleEnterViewport} topOffset='50px' bottomOffset='50px' />}
        {/* TWEET CONTENT CONTAINER */}
        {isContentVisible && (
          <div
            id={`${isApproved === 'pending' ? 'Pending' : 'Approved'} Tweet ${index + 1}`}
            className={`flex flex-col items-center gap-1 w-11/12 pb-5 max-w-md`}
          >
            {/* HEADER OF EACH TWEET */}
            <div className={`w-full flex flex-row ${INFO_TEXT} mt-1`}>
              {twitterusername && (
                <div className={`w-full`}>
                  <a className={`text-left ${INFO_TEXT} font-semibold`} href={`${tweetUrl}`} target='_blank'>
                    {twitterusername}
                  </a>
                </div>
              )}
              {tweetType && <p className={`scale-90 text-gray-600`}>{tweetType}</p>}
              {dateAdded && <p className={`scale-75 text-gray-600`}>{dateAdded}</p>}
            </div>
            {/* // PART WITH ORIGINAL TEXT */}
            <div className={`flex flex-col gap-3 w-full justify-between `}>
              {(stateGptText !== originalTweetText || isEditing) && (
                <div className={`flex flex-col gap-1 min-w-1/3 ${isEditing ? `` : ''}`}>
                  <h2 className={`${INFO_TEXT} font-semibold scale-y-75 text-gray-600`}>Original Text</h2>
                  <p
                    className={`${TWEET_TEXT} break-words  ${
                      isEditing ? `h-full px-1 border border-1 border-secondary border-opacity-50 rounded-md opacity-80 whitespace-normal` : ``
                    }`}
                  >
                    {originalTweetText}
                  </p>
                </div>
              )}
              {/* EDITION MODE IN COMPARISON MODE */}
              {isEditing ? (
                <div className='flex flex-col gap-1 min-w-1/2'>
                  <h2 className={`${INFO_TEXT} font-semibold scale-y-75`}>{stateGptText === originalTweetText ? 'Original Text' : 'ChatGpt Text'}</h2>
                  <TextareaAutosize
                    // IT CHANGES ITS VALUE BASED ON WHICH TEXT YOU ARE DISPLAYING - EITHER ORIGINAL/GPT
                    value={buttonText === 'ChatGPT Text' && stateOriginalText === originalTweetText ? stateOriginalText : stateGptText}
                    onChange={handleTextAreaChange}
                    minRows={2}
                    className={`${TWEET_TEXT} rounded-md w-full m-1 resize-none text-center border border-1 border-secondary  focus:outline-secondary  bg-white bg-opacity-80 text-black whitespace-normal break-words`}
                  />
                </div>
              ) : (
                tweetType !== 'retweet' && (
                  // DISPLAY TEXT IN COMPARISON MODE - EDITION OFF
                  <div className='flex flex-col gap-1 min-w-1/3 '>
                    <h2 className={`${INFO_TEXT}  font-semibold scale-y-75 text-gray-600`}>
                      {!isEditing && stateGptText === originalTweetText ? 'Original Text' : 'ChatGpt Text'}
                    </h2>
                    <p
                      className={`${TWEET_TEXT} group relative transition-opacity opacity-100 group-hover:opacity-70 whitespace-normal break-words`}
                      style={{ position: 'relative', zIndex: 1 }}
                    >
                      {/* TEXT ITSELF */}
                      {stateOriginalText === stateGptText ? stateOriginalText : stateGptText}
                      {/* DIV FOR REPHRASE BUTTON */}
                      <div
                        className='hidden group-hover:block absolute inset-0 mx-auto bg-white bg-opacity-20 whitespace-nowrap'
                        style={{ zIndex: 2, pointerEvents: 'none' }}
                      >
                        <button
                          onClick={handleRephrase}
                          className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-highlight rounded-full font-bold text-accent p-1 shadow-lg border-2 border-accent hover:text-white hover:border-white hover:bg-secondary hover:shadow-2xl`}
                          style={{ pointerEvents: 'auto' }}
                        >
                          Re-Rephrase
                        </button>
                      </div>
                    </p>
                  </div>
                )
              )}
            </div>
            {/* IMAGE SECTION */}
            {imageSourceState && (
              <div className='w-full group relative flex flex-col items-center'>
                {!isMediaLoaded && <Waypoint onEnter={handleMediaEnter} />}
                {isMediaLoaded && (
                  <img src={imageSourceState} className='w-full group-hover:opacity-75 rounded-lg' alt={`Image from: ${sqlId}`} loading='lazy' />
                )}
                <button
                  onClick={declineImage}
                  className={`${BUTTON_SPECIAL} whitespace-nowrap pointer-events-auto hidden group-hover:block absolute top-1/2`}
                >
                  Decline {videoSource ? 'Video' : 'Image'}
                </button>
              </div>
            )}
            {/* VIDEO SECTION */}
            {videoSourceState && (
              <div className='group relative w-full'>
                {!isMediaLoaded && <Waypoint onEnter={handleMediaEnter} />}
                {isMediaLoaded && (
                  <video className='w-full transition-opacity duration-300 group-hover:opacity-75 rounded-lg' controls style={{ zIndex: 1 }}>
                    <source src={videoSourceState} type='video/mp4' />
                    Your browser does not support the video tag.
                  </video>
                )}
                <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                  <button onClick={declineVideo} className={`${BUTTON_SPECIAL} whitespace-nowrap pointer-events-auto hidden group-hover:block `}>
                    Decline {videoSourceState ? 'Video' : 'Image'}
                  </button>
                </div>
              </div>
            )}
            {/* STATS SECTION */}
            {(replies || reposts || likes || bookmarks || views) && (
              <div id='tweetStatsSection' className='flex flex-row w-full justify-between'>
                {replies !== null && replies > 0 && (
                  <div className={`flex flex-row ${INFO_TEXT} text-accent gap-1`}>
                    <RepliesIcon alt='Replies Icon' className={`h-4 md:h-5`} style={{ fill: '#6C82A3' }} />
                    <p>{formatNumber(replies)}</p>
                  </div>
                )}
                {reposts !== null && reposts > 0 && (
                  <div className={`flex flex-row ${INFO_TEXT} text-accent gap-1`}>
                    <RepostsIcon alt='Replies Icon' className={`h-4 md:h-5`} style={{ fill: '#6C82A3' }} />
                    <p>{formatNumber(reposts)}</p>
                  </div>
                )}
                {likes !== null && likes > 0 && (
                  <div className={`flex flex-row ${INFO_TEXT} text-accent gap-1`}>
                    <LikesIcon alt='Replies Icon' className={`h-4 md:h-5`} style={{ fill: '#6C82A3' }} />
                    <p>{formatNumber(likes)}</p>
                  </div>
                )}
                {bookmarks !== null && bookmarks > 0 && (
                  <div className={`flex flex-row ${INFO_TEXT} text-accent gap-1`}>
                    <BookmarsIcon alt='Replies Icon' className={`h-4 md:h-5`} style={{ fill: '#6C82A3' }} />
                    <p>{formatNumber(bookmarks)}</p>
                  </div>
                )}
                {views !== null && views > 0 && (
                  <div className={`flex flex-row ${INFO_TEXT} text-accent gap-1`}>
                    <ViewsIcon alt='Replies Icon' className={`h-4 md:h-5`} style={{ fill: '#6C82A3' }} />
                    <p>{formatNumber(views)}</p>
                  </div>
                )}
              </div>
            )}
            {/* BUTTONS SECTION */}
            <div id='tweetButtonContainer' className='flex flex-row gap-1 flex-wrap justify-center mt-2 '>
              {isApproved === 'pending' && !isEditing && (
                <button className={BUTTON_STYLING} onClick={handleApprove}>
                  Approve
                </button>
              )}
              {tweetType !== 'retweet' && isEditing && (
                <button onClick={handleCancelButton} className={`${BUTTON_STYLING}`}>
                  Cancel
                </button>
              )}
              {tweetType !== 'retweet' && isEditing ? (
                <button className={BUTTON_STYLING} onClick={handleSave}>
                  Save
                </button>
              ) : (
                tweetType !== 'retweet' && (
                  <button className={BUTTON_STYLING} onClick={handleEdit}>
                    Edit
                  </button>
                )
              )}
              <button className={BUTTON_STYLING} onClick={handleDecline}>
                Decline
              </button>
              {isEditing && (
                <button className={`${BUTTON_STYLING} ${hideButton}`} onClick={toggleDisplayedText}>
                  {buttonText}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </FadeComponentAnimation>
  );
}

export default Tweet;
