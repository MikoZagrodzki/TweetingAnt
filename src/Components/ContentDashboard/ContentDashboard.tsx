import React, { useEffect, useState } from "react";
import Tweet from "./Tweet/Tweet";
import getAllScrapedTweets from "../../Functionalities/GetAllScrapedTweets";
import classnames from 'classnames';
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";



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
  const { currentUser }: any = useAuth();

  const [tweets, setTweets] = useState<Tweet[] | []>([]);
  const [filteredTweets, setFilteredTweets] = useState<Tweet[] | []>([]);
  const [searchPersonality, setSearchPersonality] = useState<string>("")
  const [searchTweetType, setSearchTweetType] = useState<string>("")


  const[toggleUseEffectForTweets, setToggleUseEffectForTweets] = useState<boolean>(false);

  const navigate = useNavigate();

  const getTweets = async () => {
    const tweetsData = await getAllScrapedTweets();
    setTweets(tweetsData);
    setFilteredTweets(tweetsData);
  };


  let personalitiesNoDuplicates = Array.from(new Set(tweets.map((tweet) => tweet.personality))).sort();
  let tweetTypesNoDuplicates = Array.from(new Set(tweets.map((tweet) => tweet.tweettype))).sort();

  let personalitiesWhenTweetTypeSelected = Array.from(new Set(
    tweets
      .filter((tweet) => tweet.tweettype === searchTweetType)
      .map((tweet) => tweet.personality)
      .filter((personality) => personality !== null)
      .sort()
  ));

  let tweetTypesWhenPersonalitySelected = Array.from(new Set(
    tweets
      .filter((tweet) => tweet.personality === searchPersonality)
      .map((tweet) => tweet.tweettype)
      .filter((tweetType) => tweetType !== null)
      .sort()
  ));


  const handlePersonalitySearch = (personalityToSearch: string) => {
    setSearchPersonality(personalityToSearch);
  
    if (personalityToSearch !== "") {
      const filtered = tweets.filter((tweet) =>
        tweet.personality &&
        tweet.personality.toLowerCase().includes(personalityToSearch.toLowerCase()) &&
        (!searchTweetType || tweet.tweettype?.toLowerCase() === searchTweetType.toLowerCase())
      );
  
      setFilteredTweets(filtered.length > 0 ? filtered : []);
    } else {
      // If personalityToSearch is empty, apply only the tweetType filter
      const tweetTypeFiltered = tweets.filter((tweet) =>
        !searchTweetType || tweet.tweettype?.toLowerCase() === searchTweetType.toLowerCase()
      );
  
      setFilteredTweets(tweetTypeFiltered.length > 0 ? tweetTypeFiltered : []);
    }
  };
  
  const handleTweetTypeSearch = (tweetTypeToSearch: string) => {
    setSearchTweetType(tweetTypeToSearch);
  
    if (tweetTypeToSearch !== "") {
      const filtered = tweets.filter((tweet) =>
        tweet.tweettype &&
        tweet.tweettype.toLowerCase().includes(tweetTypeToSearch.toLowerCase()) &&
        (!searchPersonality || tweet.personality?.toLowerCase() === searchPersonality.toLowerCase())
      );
  
      setFilteredTweets(filtered.length > 0 ? filtered : []);
    } else {
      // If tweetTypeToSearch is empty, apply only the personality filter
      const personalityFiltered = tweets.filter((tweet) =>
        !searchPersonality || tweet.personality?.toLowerCase() === searchPersonality.toLowerCase()
      );
  
      setFilteredTweets(personalityFiltered.length > 0 ? personalityFiltered : []);
    }
  };
  
 
  

  const handleShowAll = () => {
    setFilteredTweets(tweets);
    setSearchPersonality("");
    setSearchTweetType("");
  }  

  useEffect(() => {
    setTweets([]);
    setFilteredTweets([]);
    getTweets();
  }, [toggleUseEffectForTweets]);  



  const BUTTON_STYLING =classnames('text-xs sm:text-sm whitespace-nowrap bg-secondary font-semibold px-1 rounded-sm border border-accent hover:bg-accent hover:text-white hover:border-primary shadow-md')
  const UL_STYLING   = classnames("flex flex-col items-center gap-3")
  const INFO_TEXT = classnames('text-xs md:text-sm whitespace-nowrap')

  return (
    <div id='top' className="min-h-screen w-screen mt-10 mb-10 flex flex-col items-center gap-y-10">
      <a href="#top" className=" fixed z-20 bottom-10 right-10 font-extrabold text-2xl bg-highlight rounded-lg text-accent p-1 shadow-lg border border-accent hover:text-highlight hover:border-highlight hover:bg-accent">^</a>
      <h1 className="">Content Dashboard</h1>
      {tweets.length > 0 && 
        <div className={`${INFO_TEXT} flex flex-col md:flex-row items-center gap-3 `}>
          {filteredTweets.filter(tweet => tweet.isapproved === 'pending')&&
            <p>Tweets awaiting approval: {filteredTweets.filter(tweet => tweet.isapproved === 'pending').length}</p>
          }
          {filteredTweets.filter(tweet => tweet.isapproved === 'approved')&&
            <p>Approved Tweets: {filteredTweets.filter(tweet => tweet.isapproved === 'approved').length}</p>
          }
        </div>
      }
      <div id="selection_bar" className="flex flex-row gap-1 justify-center flex-wrap">
        <select
          value={searchPersonality}
          onChange={(e) => handlePersonalitySearch(String(e.target.value))}
          className={BUTTON_STYLING}
        >
          <option value="">All Personalities</option>
          {searchTweetType ==="" ?
            personalitiesNoDuplicates.map(uniquePersonality => (
              <option key={uuidv4()} value={uniquePersonality || ''}>
                {uniquePersonality}
              </option>
            ))
            :
            personalitiesWhenTweetTypeSelected.map(uniquePersonality => (
              <option key={uuidv4()} value={uniquePersonality || ''}>
                {uniquePersonality}
              </option>
            ))
          }
      </select>
      <select
        value={searchTweetType}
        onChange={(e) => handleTweetTypeSearch(String(e.target.value))}
        className={BUTTON_STYLING}
      >
        <option value="">All Tweet Types</option>
        {searchPersonality === "" ?
          tweetTypesNoDuplicates.map((uniqueTweetType) => (
            <option key={uniqueTweetType} value={uniqueTweetType || ""}>
              {uniqueTweetType}
            </option>
          ))
        :
          tweetTypesWhenPersonalitySelected.map((uniqueTweetType) => (
            <option key={uniqueTweetType} value={uniqueTweetType || ""}>
              {uniqueTweetType}
            </option>
          ))
        }
      </select>
      {filteredTweets.some((tweet) => tweet.isapproved === 'approved') &&
        <a href="#approvedTweets" className={`md:hidden ${BUTTON_STYLING}`}>Approved Tweets</a> 
      }
      {(searchPersonality !== "" || searchTweetType !== "") && (
        <button className={BUTTON_STYLING} onClick={handleShowAll}>
          Show All
        </button>
      )}
      {currentUser.email!=="maciek@maciek.maciek"&&
        <button className={`${BUTTON_STYLING}`} onClick={()=>{navigate('/main', { replace: true })}}>Main</button>
      }
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
                      personality={tweet.personality}
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
              <ul id="approvedTweets" className={`mt-8 md:mt-0 ${UL_STYLING}`}>
              <h2 className={INFO_TEXT}>Approved Tweets</h2>
              {filteredTweets.filter(tweet => tweet.isapproved === 'approved').map((tweet) => {
                  const index = tweets.findIndex((t) => t.tweeturl === tweet.tweeturl && t.id === tweet.id);
                  return(
                    <Tweet
                        sqlId={tweet.id}
                        imgSource={tweet.tweetpictureurl}
                        originalTweetText = {tweet.tweettext}
                        tweetText={tweet.tweettextchatgpt}
                        personality={tweet.personality}
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
