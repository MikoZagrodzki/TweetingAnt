import React, { useEffect, useState } from "react";
import getUserNameUsedForTweetsByEmail from "../../SQL/GetUserNameUsedForTweetsByEmail";
import UserNameListLiElemet from "./UserNameListLiElemet";
// import "./Card.css";
import { v4 as uuidv4 } from "uuid";
import { TwitterAccountType } from "../../TypesApi";

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

  return (
    <div className="List-name-container border-2 border-primary flex flex-col w-full max-w-sm">
      <p className="text-xs">List of Twitter accounts used for {purpose} from:</p>
      <ul className="text-sm flex flex-row flex-wrap max-h-20 overflow-y-scroll">
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
