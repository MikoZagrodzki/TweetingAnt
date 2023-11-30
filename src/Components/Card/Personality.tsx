import React from "react";
// import "./Card.css";
import { TwitterAccountType } from "../../TypesApi";
import { useAuth } from "../../AuthContext";
import { v4 as uuidv4 } from "uuid";
import classnames from 'classnames';



interface Props {
  loginNameTwitter: string;
  twitterAccounts: TwitterAccountType[];
  setTwitterAccounts: React.Dispatch<React.SetStateAction<[] | TwitterAccountType[]>>;
  personalityList: string[]| [];
}

function Personality(props: Props) {
  const { loginNameTwitter: twitterAccount, twitterAccounts, setTwitterAccounts, personalityList } = props;

  const twitterClassAccount = twitterAccounts.find(
    (account) => account.loginNameTwitter === twitterAccount
  );


  const getDefaultPersonality = () => {
    return twitterClassAccount?.personality || "";
  }

  const personalitySetter = (personality:string) => {
    if (twitterClassAccount && typeof twitterClassAccount.updatePersonality === "function") {
      twitterClassAccount.updatePersonality(personality);
      setTwitterAccounts([...twitterAccounts]);
      getDefaultPersonality()
    }
  }

const BUTTON_STYLING =classnames('text-xs sm:text-sm whitespace-nowrap bg-secondary font-semibold px-1 rounded-full border border-accent hover:bg-accent hover:text-white hover:border-primary shadow-md')
const INFO_TEXT = classnames('text-xs md:text-sm whitespace-nowrap');
const TWEET_TEXT = classnames('text-xs sm:text-sm');
const BORDER_OUTSIDE_STYLING = classnames('border border-2 border-secondary border-opacity-20');
const BORDER_STYLING = classnames('border border-2 border-white border-opacity-20');
const SHADOW_STYLING = classnames('shadow-md hover:shadow-xl');
const BUTTON_SPECIAL = classnames(' bg-highlight rounded-md font-bold text-accent p-1 shadow-lg border-2 border-accent hover:text-white hover:border-highlight hover:bg-accent hover:shadow-2xl');



  return (
    <div className={`Personality-container w-full ${BORDER_STYLING} sm:max-w-sm text-center rounded-sm ${INFO_TEXT}`}>
      <p className="" >Your accont personality</p>
      <select
        className=" w-full text-center focus:outline-accent bg-secondary bg-opacity-90 border-t border-t-white rounded-sm"
        name="personality_setter"
        id=""
        onChange={(e) => personalitySetter(String(e.target.value))}
        value={getDefaultPersonality()}
      >
        {personalityList.map((personality)=>{
          return(<option key={uuidv4()} value={personality}>{personality}</option>)
        })}
      </select>
    </div>
  );
}

export default Personality;
