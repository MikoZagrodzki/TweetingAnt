import React, { useEffect, useState } from "react";
import Tweet from "./Tweet/Tweet";
import getAllScrapedTweets from "../../Functionalities/GetAllScrapedTweets";
import classnames from 'classnames';


interface Tweet {
  id: number;
  tweettext: string;
  tweetpictureurl: string | null;
  tweeturl: string;
  tweettextchatgpt: string
  tweetvideourl: string | null;
  isapproved: string;
  personality: string | null;
  tweettype: string | null;
}

function ContentDashboard() {
  const [tweets, setTweets] = useState<Tweet[] | []>([]);
  const [filteredTweets, setFilteredTweets] = useState<Tweet[] | []>([]);
  const [filtersApplied, setFiltersApplied] = useState<boolean>(false);
  const [personality, setPersonality] = useState<string>("");
  const [tweetType, setTweetType] = useState<string>("");

  const[toggleUseEffectForTweets, setToggleUseEffectForTweets] = useState<boolean>(false);


  const getTweets = async () => {
    const tweetsData = await getAllScrapedTweets();
    setTweets(tweetsData);
    setFilteredTweets(tweetsData);
  };

  const handleApply = () => {
    let result;
  
    if (personality !== "" && tweetType !== "") {
      result = tweets.filter(
        (tweet) =>
          tweet.personality === personality && tweet.tweettype === tweetType
      );
      setFiltersApplied(true);
    } else if (personality !== "") {
      result = tweets.filter((tweet) => tweet.personality === personality);
      setFiltersApplied(true);
    } else if (tweetType !== "") {
      result = tweets.filter((tweet) => tweet.tweettype === tweetType);
      setFiltersApplied(true);
    } else {
      result = tweets;
      setPersonality("");
      setTweetType("");
      setFiltersApplied(false);
    }
  
    setFilteredTweets(result);
  };
  

  const handleShowAll = () => {
    setFiltersApplied(false);
    setFilteredTweets(tweets);
    setPersonality("");
    setTweetType("");
  }

  useEffect(() => {
    setTweets([])
    getTweets();
  }, [toggleUseEffectForTweets]);

  const uniquePersonalities = Array.from(new Set(tweets.map(tweet => tweet.personality)));
  const uniqueTweetTypes = Array.from(new Set(tweets.map(tweet => tweet.tweettype)));


  const BUTTON_STYLING =classnames('text-xs sm:text-sm whitespace-nowrap bg-secondary font-semibold px-1 rounded-sm border border-accent hover:bg-accent hover:text-white hover:border-primary shadow-md')
  const UL_STYLING   = classnames("flex flex-col items-center gap-3")
  const INFO_TEXT = classnames('text-xs md:text-sm whitespace-nowrap')

  return (
    <div className="min-h-screen w-screen mt-10 mb-10 flex flex-col items-center gap-y-10">
      <h1 className="">Content Dashboard</h1>
      <div id="selection_bar" className="flex flex-row gap-1 justify-center flex-wrap">
        <select
          value={personality || ""}
          onChange={(e) => setPersonality(e.target.value)}
          className={BUTTON_STYLING}
        >
          <option value="">Select Personality</option>
          {uniquePersonalities.map(personalityValue => (
          <option key={personalityValue} value={personalityValue || ''}>
              {personalityValue}
          </option>
          ))}
      </select>
      <select
        value={tweetType || ""}
        onChange={(e) => setTweetType(e.target.value)}
        className={BUTTON_STYLING}
      >
        <option value="">Select Tweet Type</option>
        {uniqueTweetTypes.map((uniqueTypes) => (
          <option key={uniqueTypes} value={uniqueTypes || ""}>
            {uniqueTypes}
          </option>
        ))}
      </select>
      <button className={BUTTON_STYLING} onClick={handleApply}>Apply</button>
      {filtersApplied && (
        <button className={BUTTON_STYLING} onClick={handleShowAll}>
          Show All
        </button>
      )}
      </div>
          <div id="tweetLists" className="flex flex-col md:flex-row">
            {filteredTweets.some((tweet) => tweet.isapproved === 'pending') && (
              <ul id="pendingTweets" className={UL_STYLING}>
                <h2 className={INFO_TEXT}>Pending Tweets</h2>
                {filteredTweets.filter(tweet => tweet.isapproved === 'pending').map((tweet) => {
                  const index = tweets.findIndex((t) => t.tweeturl === tweet.tweeturl && t.id === tweet.id);
                  return(
                    <Tweet
                        sqlId={tweet.id}
                        imgSource={tweet.tweetpictureurl}
                        originalTweetText = {tweet.tweettext}
                        tweetText={tweet.tweettextchatgpt}
                        tweetUrl={tweet.tweeturl}
                        videoSource={tweet.tweetvideourl}
                        isApproved={tweet.isapproved}
                        index={index}
                        tweetsDataState={tweets}
                        setTweetsDataState={setTweets}

                        toggleUseEffectForTweets={toggleUseEffectForTweets}
                        setToggleUseEffectForTweets={setToggleUseEffectForTweets}


                    />)
              })}
              </ul>
            )}
            {filteredTweets.some((tweet) => tweet.isapproved === 'approved') && (
              <ul id="approvedTweets" className={UL_STYLING}>
              <h2 className={INFO_TEXT}>Approved Tweets</h2>
              {filteredTweets.filter(tweet => tweet.isapproved === 'approved').map((tweet) => {
                  const index = tweets.findIndex((t) => t.tweeturl === tweet.tweeturl && t.id === tweet.id);
                  return(
                    <Tweet
                        sqlId={tweet.id}
                        imgSource={tweet.tweetpictureurl}
                        originalTweetText = {tweet.tweettext}
                        tweetText={tweet.tweettextchatgpt}
                        tweetUrl={tweet.tweeturl}
                        videoSource={tweet.tweetvideourl}
                        isApproved={tweet.isapproved}
                        index={index}
                        tweetsDataState={tweets}
                        setTweetsDataState={setTweets}

                        toggleUseEffectForTweets={toggleUseEffectForTweets}
                        setToggleUseEffectForTweets={setToggleUseEffectForTweets}

                    />)
              })}
              </ul>
            )}

            
          </div>
    </div>
  );
}

export default ContentDashboard;
