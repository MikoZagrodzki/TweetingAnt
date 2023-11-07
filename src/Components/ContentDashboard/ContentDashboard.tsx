import React, { useEffect, useState } from "react";
import Tweet from "./Tweet/Tweet";
import getAllScrapedTweets from "../../Functionalities/GetAllScrapedTweets";

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

  return (
    <div className="min-h-screen w-screen mt-10 mb-10 flex flex-col items-center gap-y-10">
      <div className="selection-bar">
        <select
          value={personality || ""}
          onChange={(e) => setPersonality(e.target.value)}
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
        >
          <option value="">Select Tweet Type</option>
          {uniqueTweetTypes.map((uniqueTypes) => (
            <option key={uniqueTypes} value={uniqueTypes || ""}>
              {uniqueTypes}
            </option>
          ))}
        </select>

        <button onClick={handleApply}>Apply</button>
      </div>

      <ul id="tweetToRephrase" className="flex flex-col items-center gap-3">
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
        <div id="tweetRephrased" className="flex flex-col items-center"></div>
      </ul>
    </div>
  );
}

export default ContentDashboard;
