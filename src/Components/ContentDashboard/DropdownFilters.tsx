import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

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

interface Props {
    tweets: Tweet[] | [];
    setFilteredTweets: React.Dispatch<React.SetStateAction<[] | Tweet[]>>;
    searchEmail?: string;
    setSearchEmail: React.Dispatch<React.SetStateAction<string>>;
    searchPersonality?: string;
    setSearchPersonality: React.Dispatch<React.SetStateAction<string>>;
    searchTweetType?: string;
    setSearchTweetType: React.Dispatch<React.SetStateAction<string>>;

}

function DropdownFilters(props: Props) {
  let {tweets, setFilteredTweets, searchEmail, setSearchEmail, searchPersonality, setSearchPersonality, searchTweetType, setSearchTweetType } = props;

  const [filteredEmails, setFilteredEmails] = useState<string[]>([]);
  const [filteredPersonalities, setFilteredPersonalities] = useState<string[]>([]);
  const [filteredTweetTypes, setFilteredTweetTypes] = useState<string[]>([]);

  const [allEmails, setAllEmails] = useState<string[]>([]);
  const [allPersonalities, setAllPersonalities] = useState<string[]>([]);
  const [allTweetTypes, setAllTweetTypes] = useState<string[]>([]);

  useEffect(() => {
    // Initialize the full options lists
    setAllEmails(Array.from(new Set(tweets.map((tweet) => tweet.email || ''))));
    setAllPersonalities(Array.from(new Set(tweets.map((tweet) => tweet.personality || ''))));
    setAllTweetTypes(Array.from(new Set(tweets.map((tweet) => tweet.tweettype || ''))));
  }, [tweets]);

  useEffect(() => {
    // Determine which filters are active
    const emailFilterActive = Boolean(searchEmail);
    const personalityFilterActive = Boolean(searchPersonality);
    const tweetTypeFilterActive = Boolean(searchTweetType);

    // Update dropdown options based on the combination of active filters
    if (emailFilterActive && !personalityFilterActive && !tweetTypeFilterActive) {
      // Only email filter is active
      setFilteredEmails(allEmails);
      setFilteredPersonalities(filteredOptions(tweets, 'personality', searchEmail));
      setFilteredTweetTypes(filteredOptions(tweets, 'tweettype', searchEmail));
    } else if (!emailFilterActive && personalityFilterActive && !tweetTypeFilterActive) {
      // Only personality filter is active
      setFilteredEmails(filteredOptions(tweets, 'email', null, searchPersonality));
      setFilteredPersonalities(allPersonalities);
      setFilteredTweetTypes(filteredOptions(tweets, 'tweettype', null, searchPersonality));
    } else if (!emailFilterActive && !personalityFilterActive && tweetTypeFilterActive) {
      // Only tweet type filter is active
      setFilteredEmails(filteredOptions(tweets, 'email', null, null, searchTweetType));
      setFilteredPersonalities(filteredOptions(tweets, 'personality', null, null, searchTweetType));
      setFilteredTweetTypes(allTweetTypes);
    } else {
      // Multiple filters are active
      setFilteredEmails(filteredOptions(tweets, 'email', searchEmail, searchPersonality, searchTweetType));
      setFilteredPersonalities(filteredOptions(tweets, 'personality', searchEmail, searchPersonality, searchTweetType));
      setFilteredTweetTypes(filteredOptions(tweets, 'tweettype', searchEmail, searchPersonality, searchTweetType));
    }
  }, [searchEmail, searchPersonality, searchTweetType, tweets, allEmails, allPersonalities, allTweetTypes]);

  // Helper function to get filtered options based on active filters
  function filteredOptions(
    tweets: Tweet[],
    type: 'email' | 'personality' | 'tweettype',
    email?: string | null,
    personality?: string | null,
    tweetType?: string | null
  ): string[] {
    return Array.from(
      new Set(
        tweets
          .filter(
            (tweet) =>
              (email ? tweet.email === email : true) &&
              (personality ? tweet.personality === personality : true) &&
              (tweetType ? tweet.tweettype === tweetType : true)
          )
          .map((tweet) => tweet[type] || '')
      )
    );
  }


  /////////////////////////////////////////////////////////////////////////////////////

  const BUTTON_STYLING = classnames(
    'text-xs sm:text-sm whitespace-nowrap bg-secondary font-semibold px-1 rounded-full border border-accent hover:bg-accent hover:text-white hover:border-primary shadow-md'
  );

  return (
    <div id='DropdownFiltersComponent' className='flex flex-row gap-1  justify-center flex-wrap'>
      <select
        value={searchEmail}
        onChange={(e) =>
          handleDropdownSearch({
            personality: String(searchPersonality),
            tweetType: String(searchTweetType),
            email: String(e.target.value),
        }, {tweets, setFilteredTweets, setSearchEmail, setSearchPersonality, setSearchTweetType })
    }
        className={BUTTON_STYLING}
      >
        <option value=''>All Groups</option>
        {filteredEmails.map((email) => (
          <option key={email} value={email}>
            {email}
          </option>
        ))}
      </select>
      <select
        value={searchPersonality}
        onChange={(e) =>
          handleDropdownSearch({
            personality: String(e.target.value),
            tweetType: String(searchTweetType),
            email: String(searchEmail),
        }, {tweets, setFilteredTweets, setSearchEmail, setSearchPersonality, setSearchTweetType })
    }
        className={BUTTON_STYLING}
      >
        <option value=''>All Personalities</option>
        {filteredPersonalities.map((personality) => (
          <option key={personality} value={personality}>
            {personality}
          </option>
        ))}
      </select>
      <select
        value={searchTweetType}
        onChange={(e) =>
          handleDropdownSearch({
            personality: String(searchPersonality),
            tweetType: String(e.target.value),
            email: String(searchEmail),
          }, {tweets, setFilteredTweets, setSearchEmail, setSearchPersonality, setSearchTweetType })
        }
        className={BUTTON_STYLING}
      >
        <option value=''>All Tweet Types</option>
        {filteredTweetTypes.map((tweetType) => (
          <option key={tweetType} value={tweetType}>
            {tweetType}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownFilters;


export const handleDropdownSearch = (searchParams: {personality:string, tweetType:string, email:string}, props:Props ) => {
    const { personality, tweetType, email } = searchParams;
    let {tweets, setFilteredTweets, setSearchEmail, setSearchPersonality, setSearchTweetType } = props;
    setSearchPersonality(personality);
    setSearchTweetType(tweetType);
    setSearchEmail(email);
  
    const filtered = tweets.filter((tweet) =>
      (!email || tweet.email?.toLowerCase() === email.toLowerCase()) &&
      (!personality || tweet.personality?.toLowerCase() === personality.toLowerCase()) &&
      (!tweetType || tweet.tweettype?.toLowerCase() === tweetType.toLowerCase()) 
    );

    setFilteredTweets(filtered.length > 0 ? filtered : [])
  };
