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

  time: string | null;
  userminiimageurl: string | null;
  twitterusername: string | null;
  replies: number | null;
  reposts: number | null;
  likes: number | null;
  bookmarks: number | null;
  views: number | null;
}

function ContentDashboard() {
  const { currentUser }: any = useAuth();

  const [tweets, setTweets] = useState<Tweet[] | []>([]);
  const [filteredTweets, setFilteredTweets] = useState<Tweet[] | []>([]);
  const [searchPersonality, setSearchPersonality] = useState<string>("");
  const [searchTweetType, setSearchTweetType] = useState<string>("");
  const [sortValue, setSortValue] = useState<string>("");

  const[toggleUseEffectForTweets, setToggleUseEffectForTweets] = useState<boolean>(false);

  const navigate = useNavigate();

  // const getTweets = async () => {
  //   const tweetsData = await getAllScrapedTweets();
  //   setTweets(tweetsData);
  //   setFilteredTweets(tweetsData);
  // };

  const getTweets = async () => {
    const tweetsData = await getAllScrapedTweets();
    setTweets(tweetsData);
    applyFilters(); // Apply filters after fetching new tweets
  };
  
  const applyFilters = () => {
    // Set the filtered tweets
    setFilteredTweets(tweets);

    
    if (searchPersonality !== "") {
      handlePersonalitySearch(searchPersonality);
    }
    
    if (searchTweetType !== "") {
      handleTweetTypeSearch(searchTweetType);
    }
    if(sortValue !== "" ) {
      handleSortBy(sortValue);
    }
  };

  // Add a useEffect to reapply filters when tweets or filter values change
  useEffect(() => {
    applyFilters();
  }, [tweets, searchPersonality, searchTweetType, sortValue]);

/////////////////THESE ARE FOR DROPDOWN FIELDS //////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////////


  const handlePersonalitySearch = (personalityToSearch: string) => {
    setSearchPersonality(personalityToSearch);
  
    if (personalityToSearch !== "") {
      const filtered = tweets.filter((tweet) =>
        tweet.personality &&
        tweet.personality.toLowerCase()===personalityToSearch.toLowerCase() &&
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
    // if(sortValue!==""){
    //   setSortValue("");
    // }
  };
  
  const handleTweetTypeSearch = (tweetTypeToSearch: string) => {
    setSearchTweetType(tweetTypeToSearch);
  
    if (tweetTypeToSearch !== "") {
      const filtered = tweets.filter((tweet) =>
        tweet.tweettype &&
        tweet.tweettype.toLowerCase()===tweetTypeToSearch.toLowerCase() &&
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
    // if(sortValue!==""){
    //   setSortValue("");
    // }
  };

  const handleSortBy = (sortBy: string)=>{
    setSortValue(sortBy);
    const sortedTweets = [...filteredTweets];
    switch (sortBy) {
      case "Most Replaied":
        sortedTweets.sort((a, b) => (b.replies || 0) - (a.replies || 0));
        break;
      case "Least Replaied":
        sortedTweets.sort((a, b) => (a.replies || 0) - (b.replies || 0));
        break;
      case "Most Viewed":
        sortedTweets.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "Least Viewed":
        sortedTweets.sort((a, b) => (a.views || 0) - (b.views || 0));
        break;
      case "Most Bookmarked":
        sortedTweets.sort((a, b) => (b.bookmarks || 0) - (a.bookmarks || 0));
        break;
      case "Least Bookmarked":
        sortedTweets.sort((a, b) => (a.bookmarks || 0) - (b.bookmarks || 0));
        break;
      case "Most Reposted":
        sortedTweets.sort((a, b) => (b.reposts || 0) - (a.reposts || 0));
        break;
      case "Least Reposted":
        sortedTweets.sort((a, b) => (a.reposts || 0) - (b.reposts || 0));
        break;
      case "Most Liked":
        sortedTweets.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case "Least Liked":
        sortedTweets.sort((a, b) => (a.likes || 0) - (b.likes || 0));
        break;
      case "Most Recently Added":
        sortedTweets.sort((a, b) => (b.time || '') > (a.time || '') ? 1 : -1);
        break;
      case "Least Recently Added":
        sortedTweets.sort((a, b) => (a.time || '') > (b.time || '') ? 1 : -1);
        break;
      default:
        // Default case: no sorting
        break;
    }
    setFilteredTweets(sortedTweets);
  };
  
  const handleShowAll = () => {
    setFilteredTweets(tweets);
    setSearchPersonality("");
    setSearchTweetType("");
    setSortValue("");
  }  

  useEffect(() => {
    setTweets([]);
    setFilteredTweets([]);
    getTweets();
  }, [toggleUseEffectForTweets]);  


  const BUTTON_STYLING =classnames('text-xs sm:text-sm whitespace-nowrap bg-secondary font-semibold px-1 rounded-full border border-accent hover:bg-accent hover:text-white hover:border-primary shadow-md')
  const UL_STYLING   = classnames("flex flex-col items-center md:min-w-0")
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
      <select 
        className={`${BUTTON_STYLING}`}
        value={sortValue}
        onChange={(e) => handleSortBy(String(e.target.value))}
      >
        <option key='' value=''>Sort by</option>
        <option key='Most Replaied' value='Most Replaied'>Most Replaied</option>
        <option key='Least Replaied' value='Least Replaied'>Least Replaied</option>
        <option key='Most Viewed' value='Most Viewed'>Most Viewed</option>
        <option key='Least Viewed' value='Least Viewed'>Least Viewed</option>      
        <option key='Most Bookmarked' value='Most Bookmarked'>Most Bookmarked</option>
        <option key='Least Bookmarked' value='Least Bookmarked'>Least Bookmarked</option>      
        <option key='Most Reposted' value='Most Reposted'>Most Reposted</option>
        <option key='Least Reposted' value='Least Reposted'>Least Reposted</option>      
        <option key='Most Liked' value='Most Liked'>Most Liked</option>
        <option key='Least Liked' value='Least Liked'>Least Liked</option>
        <option key='Most Recently Added' value='Most Recently Added'>Most Recently Added</option>
        <option key='Least Recently Added' value='Least Recently Added'>Least Recently Added</option>
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
      <button className={`${BUTTON_STYLING}`} onClick={()=>{navigate('/analytics', { replace: true })}}>Analytics</button>
      </div>
          <div id="tweetLists" className="flex flex-col md:flex-row w-screen md:justify-center ">
            {filteredTweets.some((tweet) => tweet.isapproved === 'pending') && (
              <ul id="pendingTweets" className={`${UL_STYLING}`}>
                <h2 className={INFO_TEXT}>Pending Tweets</h2>
                {filteredTweets.filter(tweet => tweet.isapproved === 'pending').map((tweet) => {
                  const index = tweets.findIndex((t) => t.tweeturl === tweet.tweeturl && t.id === tweet.id);
                  return(
                    <Tweet
                      key={tweet.id}
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

                      userminiimageurl={tweet.userminiimageurl}
                      twitterusername={tweet.twitterusername}
                      replies={tweet.replies}
                      reposts={tweet.reposts}
                      likes={tweet.likes}
                      bookmarks={tweet.bookmarks}
                      views={tweet.views}

                      tweetType={tweet.tweettype}
                      dateAdded={tweet.time}
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
                        key={tweet.id}
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

                        userminiimageurl={tweet.userminiimageurl}
                        twitterusername={tweet.twitterusername}
                        replies={tweet.replies}
                        reposts={tweet.reposts}
                        likes={tweet.likes}
                        bookmarks={tweet.bookmarks}
                        views={tweet.views}

                        tweetType={tweet.tweettype}
                        dateAdded={tweet.time}
                    />)
              })}
              </ul>
            )} 
          </div>
    </div>
  );
}

export default ContentDashboard;
