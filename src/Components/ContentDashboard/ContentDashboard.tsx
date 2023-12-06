import React, { useEffect, useState } from 'react';
import Tweet from './Tweet/Tweet';
import getAllScrapedTweets from '../../Functionalities/GetAllScrapedTweets';
import { useAuth } from '../../AuthContext';
import { v4 as uuidv4 } from 'uuid';
import getEmailsAndPersonalitiesFromLoginData from '../../Functionalities/GetEmailsAndPersonalitiesFromLoginData';
import useScrollToTopAndNavigate from '../UseScrollToTopAndNavigate';
import { Waypoint } from 'react-waypoint';
import DropdownFilters, { handleDropdownSearch } from './DropdownFilters';
import SortDropdown, { handleSortBy } from './SortDropdown';
import { BUTTON_STYLING, INFO_TEXT, UL_STYLING } from '../../tailwindCustomStyles';

interface Emails {
  email: string;
  personality: string;
}

interface Tweet {
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

function ContentDashboard() {
  const { currentUser }: any = useAuth();

  const [tweets, setTweets] = useState<Tweet[] | []>([]);
  const [filteredTweets, setFilteredTweets] = useState<Tweet[] | []>([]);
  const [searchPersonality, setSearchPersonality] = useState<string>('');
  const [searchTweetType, setSearchTweetType] = useState<string>('');
  const [searchEmail, setSearchEmail] = useState<string>('');
  const [sortValue, setSortValue] = useState<string>('');

  const navigate = useScrollToTopAndNavigate();

  const getTweets = async () => {
    try {
      const tweetsData = await getAllScrapedTweets();
      // const emailsToExtract = await getEmailsAndPersonalitiesFromLoginData();

      // const tweetsWithEmails = tweetsData.map((tweet:Tweet) => {
      //   const matchingEmail = emailsToExtract.find((email:Tweet) => email.personality === tweet.personality);
      //   return matchingEmail ? { ...tweet, email: matchingEmail.email } : tweet;
      // });

      setTweets(tweetsData);

      handleDropdownSearch(
        {
          personality: String(searchPersonality),
          tweetType: String(searchTweetType),
          email: String(searchEmail),
        },
        { tweets, setFilteredTweets, setSearchEmail, setSearchPersonality, setSearchTweetType }
      );
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

  useEffect(() => {
    handleDropdownSearch(
      {
        personality: String(searchPersonality),
        tweetType: String(searchTweetType),
        email: String(searchEmail),
      },
      { tweets, setFilteredTweets, setSearchEmail, setSearchPersonality, setSearchTweetType }
    );

    if (sortValue !== '') {
      handleSortBy(sortValue, { setSortValue, filteredTweets, searchEmail, searchPersonality, searchTweetType, setFilteredTweets });
    }
  }, [tweets, searchPersonality, searchTweetType, searchEmail, sortValue]);

  const handleShowAll = () => {
    setSearchPersonality('');
    setSearchTweetType('');
    setSearchEmail('');
    setSortValue('');
    setFilteredTweets(tweets);
    handleDropdownSearch(
      { personality: '', tweetType: '', email: '' },
      { tweets, setFilteredTweets, setSearchEmail, setSearchPersonality, setSearchTweetType }
    );
  };

  useEffect(() => {
    setTweets([]);
    setFilteredTweets([]);
    getTweets();
  }, []);

  return (
    <div id='top' className='min-h-screen w-screen mt-10 mb-10 flex flex-col items-center gap-y-10'>
      <a
        href='#top'
        className=' fixed z-20 bottom-10 right-10 font-extrabold text-2xl bg-secondary rounded-lg text-white p-1 shadow-lg border border-white hover:text-highlight hover:border-highlight hover:bg-accent'
      >
        ^
      </a>
      <h1 className=''>Content Dashboard</h1>
      {tweets.length > 0 && (
        <div className={`${INFO_TEXT} flex flex-col md:flex-row items-center gap-3 `}>
          {filteredTweets.filter((tweet) => tweet.isapproved === 'pending') && (
            <p>Tweets awaiting approval: {filteredTweets.filter((tweet) => tweet.isapproved === 'pending').length}</p>
          )}
          {filteredTweets.filter((tweet) => tweet.isapproved === 'approved') && (
            <p>Approved Tweets: {filteredTweets.filter((tweet) => tweet.isapproved === 'approved').length}</p>
          )}
        </div>
      )}
      <div id='selection_bar' className='flex flex-row gap-1  justify-center flex-wrap border-b-gray-700 border-b-2  pb-4 md:border-b-0 md:pb-0 '>
        <DropdownFilters
          tweets={tweets}
          setFilteredTweets={setFilteredTweets}
          searchEmail={searchEmail}
          setSearchEmail={setSearchEmail}
          searchPersonality={searchPersonality}
          setSearchPersonality={setSearchPersonality}
          searchTweetType={searchTweetType}
          setSearchTweetType={setSearchTweetType}
        />
        <SortDropdown
          sortValue={sortValue}
          setSortValue={setSortValue}
          filteredTweets={filteredTweets}
          searchEmail={searchEmail}
          searchPersonality={searchPersonality}
          searchTweetType={searchTweetType}
          setFilteredTweets={setFilteredTweets}
        />
        {filteredTweets.some((tweet) => tweet.isapproved === 'approved') && (
          <a href='#approvedTweets' className={`md:hidden ${BUTTON_STYLING}`}>
            Approved Tweets
          </a>
        )}
        {(searchPersonality !== '' || searchTweetType !== '' || searchEmail !== '' || sortValue !== '') && (
          <button className={BUTTON_STYLING} onClick={handleShowAll}>
            Show All
          </button>
        )}
        {currentUser.email === 'admin@admin.admin' && (
          <button
            className={`${BUTTON_STYLING}`}
            onClick={() => {
              navigate('/main');
            }}
          >
            Main
          </button>
        )}
        <button
          className={`${BUTTON_STYLING}`}
          onClick={() => {
            navigate('/analytics');
          }}
        >
          Analytics
        </button>
      </div>
      <div id='tweetLists' className='flex flex-col md:flex-row w-screen md:justify-center md:gap-x-5'>
        {!filteredTweets.some((tweet) => tweet) && <p className={`w-full text-center`}>There is no scraped tweets.</p>}
        {filteredTweets.some((tweet) => tweet.isapproved === 'pending') && (
          <ul id='pendingTweets' className={`${UL_STYLING} `}>
            <h2 className={`${INFO_TEXT} pb-2`}>Pending Tweets</h2>
            {filteredTweets
              .filter((tweet) => tweet.isapproved === 'pending')
              .map((tweet) => {
                const index = filteredTweets.findIndex((t) => t.tweeturl === tweet.tweeturl && t.id === tweet.id);
                return (
                  <Tweet
                    key={tweet.id}
                    sqlId={tweet.id}
                    imgSource={tweet.tweetpictureurl}
                    originalTweetText={tweet.tweettext}
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
                    baseTweets={tweets}
                  />
                );
              })}
          </ul>
        )}
        {filteredTweets.some((tweet) => tweet.isapproved === 'approved') && (
          <ul id='approvedTweets' className={`pt-5 mt-10 border-t-2 md:border-t-0 md:mt-0 md:pt-0 ${UL_STYLING} `}>
            <h2 className={`${INFO_TEXT} pb-2`}>Approved Tweets</h2>
            {filteredTweets
              .filter((tweet) => tweet.isapproved === 'approved')
              .map((tweet) => {
                const index = filteredTweets.findIndex((t) => t.tweeturl === tweet.tweeturl && t.id === tweet.id);
                return (
                  <Tweet
                    key={tweet.id}
                    sqlId={tweet.id}
                    imgSource={tweet.tweetpictureurl}
                    originalTweetText={tweet.tweettext}
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
                    baseTweets={tweets}
                  />
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ContentDashboard;
