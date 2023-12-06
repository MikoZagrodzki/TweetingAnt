import React from 'react';
import { BUTTON_STYLING } from '../../tailwindCustomStyles';

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
  sortValue?: string;
  setSortValue: React.Dispatch<React.SetStateAction<string>>;
  filteredTweets: [] | Tweet[];
  searchEmail: string;
  searchPersonality: string;
  searchTweetType: string;
  setFilteredTweets: React.Dispatch<React.SetStateAction<[] | Tweet[]>>;
}

function SortDropdown(props: Props) {
  let { sortValue, setSortValue, filteredTweets, searchEmail, searchPersonality, searchTweetType, setFilteredTweets } = props;

  return (
    <select
      className={`${BUTTON_STYLING} w-1/4 max-w-fit`}
      value={sortValue}
      onChange={(e) =>
        handleSortBy(String(e.target.value), { setSortValue, filteredTweets, searchEmail, searchPersonality, searchTweetType, setFilteredTweets })
      }
    >
      <option key='' value=''>
        Sort by
      </option>
      <option key='Most Replaied' value='Most Replaied'>
        Most Replaied
      </option>
      <option key='Least Replaied' value='Least Replaied'>
        Least Replaied
      </option>
      <option key='Most Viewed' value='Most Viewed'>
        Most Viewed
      </option>
      <option key='Least Viewed' value='Least Viewed'>
        Least Viewed
      </option>
      <option key='Most Bookmarked' value='Most Bookmarked'>
        Most Bookmarked
      </option>
      <option key='Least Bookmarked' value='Least Bookmarked'>
        Least Bookmarked
      </option>
      <option key='Most Reposted' value='Most Reposted'>
        Most Reposted
      </option>
      <option key='Least Reposted' value='Least Reposted'>
        Least Reposted
      </option>
      <option key='Most Liked' value='Most Liked'>
        Most Liked
      </option>
      <option key='Least Liked' value='Least Liked'>
        Least Liked
      </option>
      <option key='Most Recently Added' value='Most Recently Added'>
        Most Recently Added
      </option>
      <option key='Least Recently Added' value='Least Recently Added'>
        Least Recently Added
      </option>
    </select>
  );
}

export default SortDropdown;

export const handleSortBy = (sortValue: string, props: Props) => {
  let { setSortValue, filteredTweets, searchEmail, searchPersonality, searchTweetType, setFilteredTweets } = props;
  setSortValue(sortValue);
  const sortedTweets = [...filteredTweets];
  switch (sortValue) {
    case 'Most Replaied':
      sortedTweets.sort((a, b) => (b.replies || 0) - (a.replies || 0));
      break;
    case 'Least Replaied':
      sortedTweets.sort((a, b) => (a.replies || 0) - (b.replies || 0));
      break;
    case 'Most Viewed':
      sortedTweets.sort((a, b) => (b.views || 0) - (a.views || 0));
      break;
    case 'Least Viewed':
      sortedTweets.sort((a, b) => (a.views || 0) - (b.views || 0));
      break;
    case 'Most Bookmarked':
      sortedTweets.sort((a, b) => (b.bookmarks || 0) - (a.bookmarks || 0));
      break;
    case 'Least Bookmarked':
      sortedTweets.sort((a, b) => (a.bookmarks || 0) - (b.bookmarks || 0));
      break;
    case 'Most Reposted':
      sortedTweets.sort((a, b) => (b.reposts || 0) - (a.reposts || 0));
      break;
    case 'Least Reposted':
      sortedTweets.sort((a, b) => (a.reposts || 0) - (b.reposts || 0));
      break;
    case 'Most Liked':
      sortedTweets.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      break;
    case 'Least Liked':
      sortedTweets.sort((a, b) => (a.likes || 0) - (b.likes || 0));
      break;
    case 'Most Recently Added':
      sortedTweets.sort((a, b) => ((b.time || '') > (a.time || '') ? 1 : -1));
      break;
    case 'Least Recently Added':
      sortedTweets.sort((a, b) => ((a.time || '') > (b.time || '') ? 1 : -1));
      break;
    default:
      // Default case: no sorting
      break;
  }
  // setFilteredTweets(sortedTweets);
  const filtered = sortedTweets.filter(
    (tweet) =>
      (!searchEmail || tweet.email?.toLowerCase() === searchEmail.toLowerCase()) &&
      (!searchPersonality || tweet.personality?.toLowerCase() === searchPersonality.toLowerCase()) &&
      (!searchTweetType || tweet.tweettype?.toLowerCase() === searchTweetType.toLowerCase())
  );

  setFilteredTweets((prevFilteredTweets) => (filtered.length > 0 ? filtered : sortedTweets));
};
