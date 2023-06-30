import { useRef, useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./Card.css";
import { v4 as uuidv4 } from "uuid";
import SettingCard from "./SettingCard";
import FormUserContent from "../FormUserContent/FormUserContent";
import { updateIsAutomated } from "../../SQL"; 
import UserNamesList from "./UserNamesList";
import Personality from "./Personality";
import { TwitterAccountType } from "../../TypesApi";
import LikesAttack from "../burstAttack/burstAttack";

interface Props {
  loginNameTwitter: string;
  email: string;
  isAutomated: boolean | undefined;
  timesToTweet: [] | { hours: number; minutes: number }[];
  timesToLike: [] | { hours: number; minutes: number }[];
  timesToRetweet: [] | { hours: number; minutes: number }[];
  timesToComment: [] | { hours: number; minutes: number }[];
  usernameForTweets: [] | string[];
  usernameForContent: [] | string[];
  twitterAccounts: TwitterAccountType[];
  setTwitterAccounts: React.Dispatch<React.SetStateAction<[] | TwitterAccountType[]>>;
  personalityList: string[]|[];
}

function Card(props: Props) {
  const {
    loginNameTwitter: twitterAccount,
    email,
    isAutomated,
    timesToTweet,
    timesToLike,
    timesToRetweet,
    timesToComment,
    usernameForTweets,
    usernameForContent,
    twitterAccounts,
    setTwitterAccounts,
    personalityList,
  } = props;

  const ref: any = useRef();
  const openTooltip = () => ref.current.open();
  const closeTooltip = () => ref.current.close();
  
  const twitterClassAccount = twitterAccounts.find(
    (account) => account.loginNameTwitter === twitterAccount
  );

  const autommationSwitch = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    try{
      if (twitterClassAccount && typeof twitterClassAccount.updateIsAutometed === 'function') {
        twitterClassAccount.updateIsAutometed(!isAutomated);
        setTwitterAccounts([...twitterAccounts])
      }
    }catch(error){
      console.error(error)
    }
  };

  // const personality = () => {
  //   switch (twitterClassAccount?.personality) {
  //     case "default":
  //       return "Default";
  //     default:
  //       break;
  //   }
  // };



  return (
    <div id={twitterAccount} className="flex flex-col w-full card card.appear">
      <div className="flex flex-col items-start space-x-5 border-2 border-secondary p-3 w-80 max-w-full sm:w-52 md:w-60">
        <p className="text-sm sm:text-base font-semibold">{twitterAccount}</p>
        <p className="text-xs sm:text-sm sm:h-10">{twitterClassAccount?.personality}</p>
        <div className="Card-automation-container flex flex-row w-full space-x-5 py-1 items-center">
          <button type="button" onClick={openTooltip} className="text-xs sm:text-sm bg-secondary p-1 font-semibold px-2 rounded-sm shadow-md hover:bg-accent hover:text-white hover:shadow-xl">
            open
          </button>
          <div className="group">
            <p className="text-xs sm:text-sm transition-opacity duration-300 ease-in-out opacity-100 group-hover:hidden  ">
              {isAutomated ? "AUTOMATED" : "NOTAUTOMATED"}
            </p>
            <button className="text-xs sm:text-sm Card-automation-button h-full hidden transition-opacity duration-300 ease-in-out group-hover:block  bg-accent p-1 px-2 text-white rounded-sm shadow-md" onClick={autommationSwitch}>
              {isAutomated ? "TURN OFF" : "TURN ON"}
            </button>
          </div>
        </div>
      </div>
      <Popup ref={ref}>
        <div className="Card-popup-container fixed top-0 left-0 right-0 bottom-0 z-50 bg-background w-screen h-screen flex flex-col items-center overflow-y-scroll space-y-2 pb-5">
          <div className="text-sm sm:text-base md:text-lg Card-popup-container-header flex flex-row my-3 pt-3 sm:my-5 md:my-8 space-x-2">
            <h1 className="font-semibold">{twitterAccount}</h1>
            <p>{email}</p>
            {/* <div className="Card-popup-automation-container"></div> */}
          </div>
          <div className="Card-settings-container w-full flex flex-col flex-wrap space-y-2 items-center justify-center">
            <div className="flex flex-row w-11/12 justify-center space-x-2">
              <SettingCard
                loginNameTwitter={twitterAccount}
                purpose="tweet"
                howMany={timesToTweet}
                twitterAccounts={twitterAccounts}
                setTwitterAccounts={setTwitterAccounts}
              />
              <SettingCard
                loginNameTwitter={twitterAccount}
                purpose="like"
                howMany={timesToLike}
                twitterAccounts={twitterAccounts}
                setTwitterAccounts={setTwitterAccounts}
              />
            </div>
            <div className="flex flex-row w-11/12 justify-center space-x-2">
              <SettingCard
                loginNameTwitter={twitterAccount}
                purpose="retweet"
                howMany={timesToRetweet}
                twitterAccounts={twitterAccounts}
                setTwitterAccounts={setTwitterAccounts}
              />
              <SettingCard
                // key={uuidv4()}
                loginNameTwitter={twitterAccount}
                purpose="comment"
                howMany={timesToComment}
                twitterAccounts={twitterAccounts}
                setTwitterAccounts={setTwitterAccounts}
              />
            </div>
          </div>
          <div className="Card-forms-container w-11/12 flex flex-col space-y-2  sm:items-center ">
            <Personality loginNameTwitter={twitterAccount} twitterAccounts={twitterAccounts} setTwitterAccounts={setTwitterAccounts} personalityList={personalityList}/>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 w-full ">
              <div className="Form-and-list-container w-full flex flex-col space-y-2 sm:w-1/2 sm:items-end">
                <FormUserContent
                  purpose="rephrase tweets"
                  loginNameTwitter={twitterAccount}
                  funcionallity="UserNameUsedForTweets"
                  twitterAccounts={twitterAccounts}
                  setTwitterAccounts={setTwitterAccounts}
                />
                <UserNamesList
                  names={usernameForTweets}
                  loginNameTwitter={twitterAccount}
                  purpose="rephrasing tweets"
                  twitterAccounts={twitterAccounts}
                  setTwitterAccounts={setTwitterAccounts}
                />
              </div>
              <div className="Form-and-list-container w-full flex flex-col space-y-2 sm:w-1/2 sm:items-start">
                <FormUserContent
                  purpose="like/comment/retweet"
                  loginNameTwitter={twitterAccount}
                  funcionallity="UserContent"
                  twitterAccounts={twitterAccounts}
                  setTwitterAccounts={setTwitterAccounts}
                />
                <UserNamesList
                  names={usernameForContent}
                  loginNameTwitter={twitterAccount}
                  purpose="like/comment/retweet"
                  twitterAccounts={twitterAccounts}
                  setTwitterAccounts={setTwitterAccounts}
                />
              </div>
            </div>
          </div>
          <a
            href={`#${twitterAccount}`}
            type="button"
            className="Card closeButton bg-secondary font-semibold px-2 hover:bg-accent hover:text-white shadow-md"
            onClick={closeTooltip}
          >
            close
          </a>
        </div>
      </Popup>
    </div>
  );
}

export default Card;
