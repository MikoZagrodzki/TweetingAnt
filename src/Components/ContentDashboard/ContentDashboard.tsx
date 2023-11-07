import React, { useEffect, useState } from "react";
import Tweet from "./Tweet/Tweet";
import getAllScrapedTweets from "../../Functionalities/GetAllScrapedTweets";
import classnames from 'classnames';


interface Tweet {
  tweettext: string
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
  const [personality, setPersonality] = useState<string>("");
  const [tweetType, setTweetType] = useState<string>("");

  const getTweets = async () => {
    const tweetsData = await getAllScrapedTweets();
    setTweets(tweetsData);
    setFilteredTweets(tweetsData);
  };

  const handleApply = () => {
    const result = tweets.filter(
      (tweet) =>
        tweet.personality === personality && tweet.tweettype === tweetType
    );
    setFilteredTweets(result);
  };

  useEffect(() => {
    getTweets();
  }, []);

  const uniquePersonalities = Array.from(new Set(tweets.map(tweet => tweet.personality)));
  const uniqueTweetTypes = Array.from(new Set(tweets.map(tweet => tweet.tweettype)));


  const BUTTON_STYLING =classnames('text-xs sm:text-sm whitespace-nowrap bg-secondary font-semibold px-1 rounded-sm border border-accent hover:bg-accent hover:text-white hover:border-primary shadow-md')
  const UL_STYLING   = classnames("flex flex-col items-center gap-3")

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
      </div>

      <ul id="tweetToRephrase" className={UL_STYLING}>
      {filteredTweets.filter(tweet => tweet.isapproved === 'pending').map((tweet) => (
    <Tweet
        imgSource={tweet.tweetpictureurl}
        originalTweetText = {tweet.tweettext}
        tweetText={tweet.tweettextchatgpt}
        tweetUrl={tweet.tweeturl}
        videoSource={tweet.tweetvideourl}
        isApproved={tweet.isapproved}
    />
))}
      </ul>
      <ul className="">
        <div id="tweetRephrased" className={UL_STYLING}></div>
      </ul>
    </div>
  );
}

export default ContentDashboard;
