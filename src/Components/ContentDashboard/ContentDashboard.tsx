import React, { useEffect, useState } from "react";
import Tweet from "./Tweet/Tweet";
import getAllScrapedTweets from "../../Functionalities/GetAllScrapedTweets";
import classnames from 'classnames';
import { useAuth } from "../../AuthContext";
import { v4 as uuidv4 } from "uuid";
import getEmailsAndPersonalitiesFromLoginData from "../../Functionalities/GetEmailsAndPersonalitiesFromLoginData";
import useScrollToTopAndNavigate from "../UseScrollToTopAndNavigate";


interface Emails {
  email:string;
  personality:string;
}

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

  email:string;
}

function ContentDashboard() {
  const { currentUser }: any = useAuth();

  const [tweets, setTweets] = useState<Tweet[] | []>([]);
  const [filteredTweets, setFilteredTweets] = useState<Tweet[] | []>([]);
  const [searchPersonality, setSearchPersonality] = useState<string>("");
  const [searchTweetType, setSearchTweetType] = useState<string>("");
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [sortValue, setSortValue] = useState<string>("");

  const navigate = useScrollToTopAndNavigate();

  const getTweets = async () => {
    const tweetsData = await getAllScrapedTweets();
    const emailsToExtract = await getEmailsAndPersonalitiesFromLoginData();
  
    const tweetsWithEmails = tweetsData.map((tweet:Tweet) => {
      const matchingEmail = emailsToExtract.find((email:Tweet) => email.personality === tweet.personality);
      return matchingEmail ? { ...tweet, email: matchingEmail.email } : tweet;
    });
    
    setTweets(tweetsWithEmails);

    handleDropdownSearch({
      personality: String(searchPersonality),
      tweetType: String(searchTweetType),
      email: String(searchEmail)
    });
  };
  
  
  // const applyFilters = () => {
  //   // Set the filtered tweets
  //   setFilteredTweets(tweets);

  //   if (searchPersonality !== "" || searchTweetType !== "" || searchEmail !== "") {
  //     handleDropdownSearch({personality:String(searchPersonality), tweetType:String(searchTweetType), email:String(searchEmail)})
  //   }
  //   if(sortValue !== "" ) {
  //     handleSortBy(sortValue);
  //   }
  // };

  useEffect(() => {
    handleDropdownSearch({
      personality: String(searchPersonality),
      tweetType: String(searchTweetType),
      email: String(searchEmail)
    });

    if(sortValue !== "" ) {
      handleSortBy(sortValue);
    }
  }, [tweets, searchPersonality, searchTweetType, searchEmail, sortValue]);

/////////////////THESE ARE FOR DROPDOWN FIELDS //////////////////////////////////
  let personalitiesNoDuplicates = Array.from(new Set(tweets.map((tweet) => tweet.personality))).sort();
  let tweetTypesNoDuplicates = Array.from(new Set(tweets.map((tweet) => tweet.tweettype))).sort();
  let emailsNoDuplicates = Array.from(new Set(tweets.map((tweet) => tweet.email))).sort();

  // Function to filter tweets based on selected criteria
  function getFilterTypes(searchPersonality:string|null, searchTweetType:string|null, searchEmail:string|null) {
    return tweets.filter((tweet) =>
      (searchPersonality ? tweet.personality === searchPersonality : true) &&
      (searchTweetType ? tweet.tweettype === searchTweetType : true) &&
      (searchEmail ? tweet.email === searchEmail : true)
    );
  }
  // Get personalities when tweet type or email is selected
  let personalitiesWhenTweetTypeOrEmailSelected = Array.from(new Set(
    getFilterTypes(null, searchTweetType, searchEmail)
      .map((tweet) => tweet.personality)
      .filter((personality) => personality !== null)
      .sort()
  ));
  // Get tweet types when personality or email is selected
  let tweetTypesWhenPersonalityOrEmailSelected = Array.from(new Set(
    getFilterTypes(searchPersonality, null, searchEmail)
      .map((tweet) => tweet.tweettype)
      .filter((tweetType) => tweetType !== null)
      .sort()
  ));
  // Get emails when personality or tweet type is selected
  let emailsWhenPersonalityOrTweetTypeSelected = Array.from(new Set(
    getFilterTypes(searchPersonality, searchTweetType, null)
      .map((tweet) => tweet.email)
      .filter((email) => email !== null)
      .sort()
  ));
  //Function that renders JSX elements
  const renderDropdownOptions = (options:(string|null)[], selectedValue:string) => {
    return options?.map((uniqueValue) => (
      <option key={uuidv4()} value={uniqueValue || ''} selected={uniqueValue === selectedValue}>
        {uniqueValue}
      </option>
    ));
  };

/////////////////////////////////////////////////////////////////////////////////////




  const handleDropdownSearch = (searchParams: {personality:string, tweetType:string, email:string} ) => {
    const { personality, tweetType, email } = searchParams;
    setSearchPersonality(personality);
    setSearchTweetType(tweetType);
    setSearchEmail(email);
  
    const filtered = tweets.filter((tweet) =>
      (!personality || tweet.personality?.toLowerCase() === personality.toLowerCase()) &&
      (!tweetType || tweet.tweettype?.toLowerCase() === tweetType.toLowerCase()) &&
      (!email || tweet.email?.toLowerCase() === email.toLowerCase())
    );

    setFilteredTweets(filtered.length > 0 ? filtered : []);
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
    setSearchEmail("");
    setSortValue("");
  }  

  useEffect(() => {
    setTweets([]);
    setFilteredTweets([]);
    getTweets();
  }, []);


  const BUTTON_STYLING =classnames('text-xs sm:text-sm whitespace-nowrap bg-secondary font-semibold px-1 rounded-full border border-accent hover:bg-accent hover:text-white hover:border-primary shadow-md')
  const UL_STYLING   = classnames("flex flex-col items-center md:min-w-0 md:w-full md:max-w-lg")
  const INFO_TEXT = classnames('text-xs md:text-sm whitespace-nowrap')

  return (
    <div id='top' className="min-h-screen w-screen mt-10 mb-10 flex flex-col items-center gap-y-10">
      <a href="#top" className=" fixed z-20 bottom-10 right-10 font-extrabold text-2xl bg-secondary rounded-lg text-white p-1 shadow-lg border border-white hover:text-highlight hover:border-highlight hover:bg-accent">^</a>
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
      <div id="selection_bar" className="flex flex-row gap-1  justify-center flex-wrap border-b-gray-700 border-b-2  pb-4 md:border-b-0 md:pb-0 ">
        <select
          value={searchEmail}
          onChange={(e) => handleDropdownSearch({personality:String(searchPersonality), tweetType:String(searchTweetType), email:String(e.target.value)})}
          className={BUTTON_STYLING}
        >
          <option value="">All Groups</option>
          {renderDropdownOptions(searchEmail ==="" ? emailsNoDuplicates : emailsWhenPersonalityOrTweetTypeSelected, searchEmail)}
      </select>
        <select
          value={searchPersonality}
          onChange={(e) => handleDropdownSearch({personality:String(e.target.value), tweetType:String(searchTweetType), email:String(searchEmail)})}
          className={BUTTON_STYLING}
        >
          <option value="">All Personalities</option>
          {renderDropdownOptions(searchPersonality ==="" ? personalitiesNoDuplicates : personalitiesWhenTweetTypeOrEmailSelected, searchPersonality)}
      </select>
      <select
        value={searchTweetType}
        onChange={(e) => handleDropdownSearch({personality:String(searchPersonality), tweetType:String(e.target.value), email:String(searchEmail)})}
        className={BUTTON_STYLING}
      >
        <option value="">All Tweet Types</option>
        {renderDropdownOptions(searchTweetType ==="" ? tweetTypesNoDuplicates : tweetTypesWhenPersonalityOrEmailSelected, searchTweetType)}
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
      {(searchPersonality !== "" || searchTweetType !== "" || searchEmail !== "" || sortValue !== "") && (
        <button className={BUTTON_STYLING} onClick={handleShowAll}>
          Show All
        </button>
      )}
      {currentUser.email==="admin@admin.admin"&&
        <button className={`${BUTTON_STYLING}`} onClick={()=>{navigate('/main')}}>Main</button>
      }
      <button className={`${BUTTON_STYLING}`} onClick={()=>{navigate('/analytics')}}>Analytics</button>
      </div>
          <div id="tweetLists" className="flex flex-col md:flex-row w-screen md:justify-center md:gap-x-5">
            {!filteredTweets.some((tweet)=>tweet) && <p className={`w-full text-center`}>There is no scraped tweets.</p>}
            {filteredTweets.some((tweet) => tweet.isapproved === 'pending') && (
              <ul id="pendingTweets" className={`${UL_STYLING} `}>
                <h2 className={`${INFO_TEXT} pb-2`}>Pending Tweets</h2>
                {filteredTweets.filter(tweet => tweet.isapproved === 'pending').map((tweet) => {
                  const index = filteredTweets.findIndex((t) => t.tweeturl === tweet.tweeturl && t.id === tweet.id);
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
                      filteredTweetsDataState={filteredTweets}
                      setFilteredTweetsDataState={setFilteredTweets}
                      userminiimageurl={tweet.userminiimageurl}
                      twitterusername={tweet.twitterusername}
                      replies={tweet.replies}
                      reposts={tweet.reposts}
                      likes={tweet.likes}
                      bookmarks={tweet.bookmarks}
                      views={tweet.views}

                      tweetType={tweet.tweettype}
                      dateAdded={tweet.time}

                      setBaseTweets={setTweets}
                    />)
              })}
              </ul>
            )}
            {filteredTweets.some((tweet) => tweet.isapproved === 'approved') && (
              <ul id="approvedTweets" className={`pt-5 mt-10 border-t-2 md:border-t-0 md:mt-0 md:pt-0 ${UL_STYLING} `}>
              <h2 className={`${INFO_TEXT} pb-2`}>Approved Tweets</h2>
              {filteredTweets.filter(tweet => tweet.isapproved === 'approved').map((tweet) => {
                  const index = filteredTweets.findIndex((t) => t.tweeturl === tweet.tweeturl && t.id === tweet.id);
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
                        filteredTweetsDataState={filteredTweets}
                        setFilteredTweetsDataState={setFilteredTweets}
                        userminiimageurl={tweet.userminiimageurl}
                        twitterusername={tweet.twitterusername}
                        replies={tweet.replies}
                        reposts={tweet.reposts}
                        likes={tweet.likes}
                        bookmarks={tweet.bookmarks}
                        views={tweet.views}

                        tweetType={tweet.tweettype}
                        dateAdded={tweet.time}

                        setBaseTweets={setTweets}
                    />)
              })}
              </ul>
            )} 
          </div>
    </div>
  );
}

export default ContentDashboard;
