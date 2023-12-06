import React from "react";
// import "./Card.css";
import { TwitterAccountType } from "../../TypesApi";
import { useAuth } from "../../AuthContext";
import { v4 as uuidv4 } from "uuid";
import { BORDER_STYLING, INFO_TEXT } from "../../tailwindCustomStyles";


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
