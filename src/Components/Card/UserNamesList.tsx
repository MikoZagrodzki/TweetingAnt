import React, { useEffect, useState } from "react";
import getUserNameUsedForTweetsByEmail from "../../SQL/GetUserNameUsedForTweetsByEmail";
import UserNameListLiElemet from "./UserNameListLiElemet";
// import "./Card.css";
import { v4 as uuidv4 } from "uuid";
import { TwitterAccountType } from "../../TypesApi";
import classnames from 'classnames';


interface Props {
  loginNameTwitter: string;
  purpose: string;
  names: [] | string[];
  twitterAccounts: TwitterAccountType[];
  setTwitterAccounts: React.Dispatch<
    React.SetStateAction<[] | TwitterAccountType[]>
  >;
}

function UserNamesList(props: Props) {
  const {
    loginNameTwitter: twitterAccount,
    purpose,
    names,
    twitterAccounts,
    setTwitterAccounts,
  } = props;

  const BUTTON_STYLING =classnames('text-xs sm:text-sm whitespace-nowrap bg-secondary font-semibold px-1 rounded-full border border-accent hover:bg-accent hover:text-white hover:border-primary shadow-md')
  const INFO_TEXT = classnames('text-xs md:text-sm whitespace-nowrap');
  const TWEET_TEXT = classnames('text-xs sm:text-sm');
  const BORDER_STYLING = classnames('border border-2 border-secondary');
  const SHADOW_STYLING = classnames('shadow-md hover:shadow-xl');
  const BUTTON_SPECIAL = classnames(' bg-highlight rounded-md font-bold text-accent p-1 shadow-lg border-2 border-accent hover:text-white hover:border-highlight hover:bg-accent hover:shadow-2xl');
  const BORDER_OUTSIDE_STYLING = classnames('border border-2 border-white border-opacity-20');


  return (
    <div className={`List-name-container ${BORDER_OUTSIDE_STYLING} flex flex-col w-full sm:max-w-md ${INFO_TEXT}`}>
      <p className="mx-1 whitespace-nowrap">List of accounts used for {purpose}{purpose !== "like/comment/retweet"&&" from"}:</p>
      <ul className="flex flex-row flex-wrap max-h-20 md:max-h-40 overflow-y-scroll">
        {names.map((name) => (
          <UserNameListLiElemet
            key={uuidv4()}
            purpose={purpose}
            username={name}
            loginNameTwitter={twitterAccount}
            twitterAccounts={twitterAccounts}
            setTwitterAccounts={setTwitterAccounts}
          />
        ))}
      </ul>
    </div>
  );
}

export default UserNamesList;
