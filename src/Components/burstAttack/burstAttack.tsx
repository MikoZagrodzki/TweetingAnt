import React, { useRef, useState } from "react";
import "./burstAttack.css";
import {
  FormData,
  BurstAttackFormData,
  TwitterAccountType,
} from "../../TypesApi";
// import { triggerLikeTweetUrl } from '../../Funcinalities';
import { useAuth } from "../../AuthContext";
import { insertCommentsAttack, insertLikesAttack, insertRephraseAttack, insertRetweetsAttack } from "../../SQL";
import { v4 as uuidv4 } from "uuid";
import classnames from 'classnames';


interface Props {
  twitterAccounts: TwitterAccountType[];
  setTwitterAccounts: React.Dispatch<
    React.SetStateAction<[] | TwitterAccountType[]>
  >;
  closeTooltip: any;
}

type Time = {
  hours: number;
  minutes: number;
};

function LikesAttack(props: Props) {
  const { twitterAccounts, setTwitterAccounts, closeTooltip } = props;
  const { currentUser }: any = useAuth();
  const [url, setUrl] = useState<string>("");
  const [burstAttackFormData, setBurstAttackFormData] = useState<BurstAttackFormData[]>([]);
  const [likesAttackFormData, setLikesAttackFormData] = useState<BurstAttackFormData[]>([]);
  const [retweetsAttackFormData, setRetweetsAttackFormData] = useState<BurstAttackFormData[]>([]);
  const [commentsAttackFormData, setCommentsAttackFormData] = useState<BurstAttackFormData[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<TwitterAccountType[]>(twitterAccounts);
  const [selectValue, setSelectValue] = useState<string>("");
  const [amountValue, setAmountValue] = useState<number>(filteredAccounts.length);
  const [rephraseSwitch, setRephraseSwitch] = useState<boolean>(false);
  const [likeSwitch, setLikeSwitch] = useState<boolean>(false);
  const [retweetSwitch, setRetweetSwitch] = useState<boolean>(false);
  const [commentSwitch, setCommentSwitch] = useState<boolean>(false);


  const handleLikeChange = () => {
    setLikeSwitch(!likeSwitch);
  };

  const handleCommentChange = () => {
    setCommentSwitch(!commentSwitch);
  };

  const handleRetweetChange = () => {
    setRetweetSwitch(!retweetSwitch);
  };

  const getRandomHour = (): number => {
    const currentDate = new Date();
    const hour = parseInt(
      Math.floor(
        Math.random() * (23 - currentDate.getHours()) + currentDate.getHours()
      )
        .toString()
        .padStart(2, "0")
    );
    // const minute = parseInt(
    //   Math.floor(Math.random() * 60)
    //     .toString()
    //     .padStart(2, '0')
    // );
    // const randomTime: Time = { hours: hour, minutes: minute };
    const randomHour = 0;
    return randomHour;
  };

  const getRandomMinutes = (): number => {
    const minute = parseInt(
      Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, "0")
    );
    const randomMinutes = minute;
    return randomMinutes;
  };


  const amountSetter = (amount:number) => {
    setAmountValue(amount)
    // if(amount=== 0){

    // }
  }

  const personalitySetter = (personality: string) => {
    setSelectValue(personality);
    if (personality === "All Personalities") {
      setFilteredAccounts(twitterAccounts);
    }else{
      setFilteredAccounts(
        twitterAccounts.filter((account) => account.personality === personality)
      );
    }
  };

  const formSubmit = async (event: any) => {
    event.preventDefault();
    if (url === "") {
      alert("Wrong URL provided.");
      return;
    }
    if (url) {
      if(likeSwitch){
        let likesDataObject: any = { formData: [...likesAttackFormData] };
        const randomAccounts = [...filteredAccounts].sort(() => Math.random() - 0.5).slice(0, amountValue);
        randomAccounts.map((x) => {
          likesDataObject.formData.push({
            email: currentUser.email,
            loginnametwitter: x.loginNameTwitter,
            url: url,
            hours: getRandomHour(),
            minutes: getRandomMinutes(),
          });
        });
        await insertLikesAttack(likesDataObject);
        setLikesAttackFormData([])
      }
      if(retweetSwitch){
        let retweetDataObject: any = { formData: [...retweetsAttackFormData] };
        const randomAccounts = [...filteredAccounts].sort(() => Math.random() - 0.5).slice(0, amountValue);
        randomAccounts.map((x) => {
          retweetDataObject.formData.push({
            email: currentUser.email,
            loginnametwitter: x.loginNameTwitter,
            url: url,
            hours: getRandomHour(),
            minutes: getRandomMinutes(),
          });
        });
        await insertRetweetsAttack(retweetDataObject);
        setRetweetsAttackFormData([])
      }
      if(commentSwitch){
        let commentDataObject: any = { formData: [...commentsAttackFormData] };
        const randomAccounts = [...filteredAccounts].sort(() => Math.random() - 0.5).slice(0, amountValue);
        randomAccounts.map((x) => {
          commentDataObject.formData.push({
            email: currentUser.email,
            loginnametwitter: x.loginNameTwitter,
            url: url,
            hours: getRandomHour(),
            minutes: getRandomMinutes(),
          });
        });
        await insertCommentsAttack(commentDataObject);
        setCommentsAttackFormData([])
      }
      setUrl("");
      setBurstAttackFormData([]);
      closeTooltip();
    } else {
      alert("Wrong URL provided.");
      return;
    }
  };

  const personalities = twitterAccounts.map((account) => {
    return account.personality;
  });
  const personalitiesNoDuplicates = Array.from(new Set(personalities));

  const BUTTON_STYLING =classnames('text-xs sm:text-sm whitespace-nowrap bg-secondary font-semibold px-1 rounded-full border border-accent hover:bg-accent hover:text-white hover:border-primary shadow-md')
  const INFO_TEXT = classnames('text-xs md:text-sm whitespace-nowrap');
  const TWEET_TEXT = classnames('text-xs sm:text-sm');
  const BORDER_OUTSIDE_STYLING = classnames('border border-2 border-secondary border-opacity-20');
  const BORDER_STYLING = classnames('border border-2 border-white border-opacity-20');
  const SHADOW_STYLING = classnames('shadow-md hover:shadow-xl');
  const BUTTON_SPECIAL = classnames(' bg-highlight rounded-md font-bold text-accent p-1 shadow-lg border-2 border-accent hover:text-white hover:border-highlight hover:bg-accent hover:shadow-2xl');
  
  


  return (
    <div className={`LikesAttack_Container ${TWEET_TEXT} text-white flex  flex-col items-center bg-background bg-opacity-90 ${BORDER_OUTSIDE_STYLING} border-opacity-50 w-10/12 space-y-2 max-w-md`}>
      <p className="py-2">Paste link to tweet and perform a burst attack </p>
      <form className="flex flex-row w-11/12 justify-center">
        <input
          className={`w-3/4 shadow-md mr-1 rounded-sm focus:outline-accent text-black`}
          type="url"
          placeholder="TWEET URL"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <button className={`w-1/4 bg-secondary font-semibold px-2 rounded-sm ${BORDER_STYLING} hover:bg-accent hover:text-white shadow-md`} onClick={(event) => formSubmit(event)}>Attack!</button>
      </form>
      <p>You are performing atatck with:</p>
      <div className="setters_container w-11/12 flex flex-row space-x-2">
        <select
          className={`w-4/12 shadow-md focus:outline-accent text-black`}
          name="amount_setter"
          id=""
          onChange={(e) => amountSetter(Number(e.target.value))}
          value={amountValue}
        >
          {Array.from({ length: filteredAccounts.length }, (_, index) => filteredAccounts.length - index).map((number) => (
            <option key={uuidv4()} value={number}>
              {number>1?`${number} accounts`:`${number} account`}
            </option>
          ))}
        </select>
        <select
          className={`w-8/12 shadow-md focus:outline-accent text-black`}
          name="personality_setter"
          id=""
          onChange={(e) => personalitySetter(String(e.target.value))}
          value={selectValue}
        >
          <option key={uuidv4()} value="All Personalities">
            All Personalities
          </option>
          {personalitiesNoDuplicates.map((personality) => {
            return (
              <option key={uuidv4()} value={personality}>
                {personality} personality
              </option>
            );
          })}
        </select>
      </div>
      <div className={`select_container flex flex-row space-x-2 pb-3`}>
        <div className="select_single_container">
          <p>Like</p>
          <label className={`switch`}>
            <input className={`shadow-sm `} type="checkbox" onChange={handleLikeChange} checked={likeSwitch} />
            <span className={`slider border border-highlight shadow-lg rounded-full`}></span>
          </label>
        </div>
        {(currentUser.email==="admin@admin.admin" || currentUser.email.includes("@batch")) && (
          <div className={`select_single_container`}>
            <p>Rephrase</p>
            <label className={`switch`}>
              <input className={`shadow-sm`} type="checkbox" onChange={handleRetweetChange} checked={retweetSwitch} />
              <span className={`slider border border-highlight shadow-lg rounded-full`}></span>
            </label>
          </div>
         )}
        <div className={`select_single_container`}>
          <p>Comment</p>
          <label className={`switch`}>
            <input className={`shadow-sm`} type="checkbox" onChange={handleCommentChange} checked={commentSwitch} />
            <span className={`slider border border-highlight shadow-lg rounded-full`}></span>
          </label>
        </div>
        <div className={`select_single_container`}>
          <p>Retweet</p>
          <label className={`switch`}>
            <input className={`shadow-sm`} type="checkbox" onChange={handleRetweetChange} checked={retweetSwitch} />
            <span className={`slider border border-highlight shadow-lg rounded-full`}></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default LikesAttack;
