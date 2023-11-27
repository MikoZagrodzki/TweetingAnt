import React, { useState } from "react";
// import "./Card.css";
import { v4 as uuidv4 } from "uuid";
import SettingCardLiElement from "./SettingCardLiElement";
import { TwitterAccountType } from "../../TypesApi";

interface Props {
  loginNameTwitter: string;
  purpose: string;
  howMany: [] | { hours: number; minutes: number }[];
  twitterAccounts: TwitterAccountType[];
  setTwitterAccounts: React.Dispatch<
    React.SetStateAction<[] | TwitterAccountType[]>
  >;
}

function SettingCard(props: Props) {
  const {
    loginNameTwitter,
    purpose,
    howMany,
    twitterAccounts,
    setTwitterAccounts,
  } = props;


  const twitterClassAccount = twitterAccounts.find(
    (account) => account.loginNameTwitter === loginNameTwitter
  );

  const getDefaultIntensivity = () => {
    try {
      switch (purpose) {
        case "tweet":
          return Number(twitterClassAccount?.tweetsIntensivity); // Parse as number
        case "like":
          return Number(twitterClassAccount?.likesIntensivity); // Parse as number
        case "retweet":
          return Number(twitterClassAccount?.retweetsIntensivity); // Parse as number
        case "comment":
          return Number(twitterClassAccount?.commentsIntensivity); // Parse as number
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedIntensivity, setSelectedIntensivity] = useState<number>(
    getDefaultIntensivity()||0
  );

  const updateIntensivity = async (value: number) => {
    
    try {
      switch (purpose) {
        case "tweet":
          if (twitterClassAccount && typeof twitterClassAccount.updateTimesToTweetIntensivity === 'function') {
            twitterClassAccount.updateTimesToTweetIntensivity(Number(value));
            setSelectedIntensivity(Number(value));
          }
          break;
        case "like":
          if (twitterClassAccount && typeof twitterClassAccount.updateTimesToLikeIntensivity === 'function') {
            twitterClassAccount.updateTimesToLikeIntensivity(Number(value));
            setSelectedIntensivity(Number(value));
          }
          break;
        case "retweet":
          if (twitterClassAccount && typeof twitterClassAccount.updateTimesToRetweetIntensivity === 'function') {
            twitterClassAccount.updateTimesToRetweetIntensivity(Number(value));
            setSelectedIntensivity(Number(value));
          }
          break;
        case "comment":
          if (twitterClassAccount && typeof twitterClassAccount.updateTimesToCommentIntensivity === 'function') {
            console.log(value)
            twitterClassAccount.updateTimesToCommentIntensivity(Number(value));
            setSelectedIntensivity(Number(value));
          }
          break;
        default:
          break;
      }
      setTwitterAccounts([...twitterAccounts]);
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <div className="text-xs sm:text-sm SettingCard-container w-6/12 border-2 border-primary max-w-md h-28 rounded-sm ">
      <select
        className="w-full focus:outline-accent bg-secondary border-b border-b-accent"
        name="intensivity_setter"
        id=""
        onChange={(e) => updateIntensivity(Number(e.target.value))}
        value={selectedIntensivity}
        autoFocus={false}
      >
        <option value={1}>{purpose} intensivity low</option>
        <option value={5}>{purpose} intensivity medium</option>
        <option value={10}>{purpose} intensivity high</option>
        <option value={0}>{purpose} OFF</option>
      </select>
      <p className="ml-1">{props.purpose}s at:</p>
      <ul className="text-sm sm:text-base overflow-y-scroll overflow-x-clip flex flex-row flex-wrap h-3/6 mx-1">
        {howMany.length > 0 &&
          howMany.map((x) => {
            return (
              <SettingCardLiElement
                key={uuidv4()}
                loginNameTwitter={loginNameTwitter}
                purpose={purpose}
                hours={x.hours}
                minutes={x.minutes}
                twitterAccounts={twitterAccounts}
                setTwitterAccounts={setTwitterAccounts}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default SettingCard;
