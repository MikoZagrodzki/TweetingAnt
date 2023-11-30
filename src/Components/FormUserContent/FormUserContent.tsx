import React, { useState } from "react";
import { useAuth } from "../../AuthContext";
import {
  checkUserNameUsedForTweets,
  checkUserContent,
} from "../../SQL";
// import "./FormUserContent.css";
import { v4 as uuidv4 } from "uuid";
import { TwitterAccountType } from "../../TypesApi";
import classnames from 'classnames';



interface Props {
  loginNameTwitter: string;
  purpose: string;
  funcionallity?: string;
  twitterAccounts: TwitterAccountType[];
  setTwitterAccounts: React.Dispatch<React.SetStateAction<[] | TwitterAccountType[]>>;
}

interface FormData {
  email: string;
  loginnametwitter: string;
  usernameusedfortweets: string;
}

function FormUserContent(props: Props) {
  const { loginNameTwitter: twitterAccount, purpose, funcionallity, twitterAccounts, setTwitterAccounts, } = props;
  const [formData, setFormData] = useState<FormData[]>([]);
  const [inputValue, setinputValue] = useState<string>("");
  const [errorMessageLoginData, setErrorMessageLoginData] = useState<boolean>(false);
  const { currentUser }: any = useAuth();
  
  const twitterClassAccount = twitterAccounts.find(
    (account) => account.loginNameTwitter === twitterAccount
  );

  const addNext = async () => {
    if(inputValue===""){
      return
    }
    let doesExist;
    switch (funcionallity) {
      case "UserNameUsedForTweets":
        doesExist = await checkUserNameUsedForTweets(twitterAccount, inputValue);
        break;
      case "UserContent":
        doesExist = await checkUserContent(twitterAccount, inputValue);
        break;
      default:
        console.error("No functionallity passed");
    }
    if (doesExist) {
      setErrorMessageLoginData(true);
      return;
    }
    setFormData([
      ...formData,
      {
        email: currentUser.email,
        loginnametwitter: twitterAccount,
        usernameusedfortweets: inputValue,
      },
    ]);
    setinputValue("");
    setErrorMessageLoginData(false);
  };

  const formSubmit = async (event: any) => {
    event.preventDefault();
    if (formData.length < 1 && !inputValue) {
      return;
    }
    const dataObject: any = { formData: [...formData] };
    if (inputValue) {
      dataObject.formData.push({
        email: currentUser.email,
        loginnametwitter: twitterAccount,
        usernameusedfortweets: inputValue,
      });
    }
    try {
      switch (funcionallity) {
        case "UserNameUsedForTweets":
          if (twitterClassAccount && typeof twitterClassAccount.addUsernameForTweets === 'function') {
            twitterClassAccount.addUsernameForTweets(dataObject);
            setTwitterAccounts([...twitterAccounts]);
          }
          break;
        case "UserContent":
          if (twitterClassAccount && typeof twitterClassAccount.addUserContent === 'function') {
            twitterClassAccount.addUserContent(dataObject);
          }
          break;
          default:
            console.error("No functionallity passed");
          }
        } catch (error) {
          console.error(error);
        }
    setTwitterAccounts([...twitterAccounts]);
    setFormData([]);
    setinputValue("");
    setErrorMessageLoginData(false);
  };

  const removeFormData = (index: number) => {
    const newData = [...formData];
    newData.splice(index, 1);
    setFormData(newData);
  };

  const BUTTON_STYLING =classnames('text-xs sm:text-sm whitespace-nowrap bg-secondary font-semibold px-1 rounded-full border border-accent hover:bg-accent hover:text-white hover:border-primary shadow-md')
  const INFO_TEXT = classnames('text-xs md:text-sm whitespace-nowrap');
  const TWEET_TEXT = classnames('text-xs sm:text-sm');
  const BORDER_STYLING = classnames('border border-2 border-secondary');
  const SHADOW_STYLING = classnames('shadow-md hover:shadow-xl');
  const BUTTON_SPECIAL = classnames(' bg-highlight rounded-md font-bold text-accent p-1 shadow-lg border-2 border-accent hover:text-white hover:border-highlight hover:bg-accent hover:shadow-2xl');
  const BORDER_OUTSIDE_STYLING = classnames('border border-2 border-white border-opacity-20');


  return (
    <div className={`${INFO_TEXT} FormUserContent-container flex flex-col ${BORDER_OUTSIDE_STYLING} w-full sm:max-w-md `}>
      <p className="m-1 sm:h-8">Add Username to {purpose} from</p>
      <form className="flex flex-row justify-between mx-1">
        <input
          className="focus:outline-accent shadow-md w-3/4 mr-2 rounded-sm text-center"
          type="text"
          placeholder="Twitter Username"
          value={inputValue}
          onChange={(event) => setinputValue(event.target.value)}
        />
        <div className="flex flex-row space-x-2">
          <button className="bg-secondary font-semibold px-1 rounded-sm hover:bg-accent hover:text-white shadow-md whitespace-nowrap"  type="button" onClick={() => addNext()}>
            Add next
          </button>
        <button  className="bg-secondary font-semibold px-1 rounded-sm hover:bg-accent hover:text-white shadow-md whitespace-nowrap" onClick={(event) => formSubmit(event)}>Submit</button>
        </div>
      </form>
        {errorMessageLoginData && <p>Twitter Username already added.</p>}
      <div className="FormUserContent-elements-container py-2 flex flex-row flex-wrap mx-1 justify-center max-h-14 overflow-y-scroll">
        {formData.length > 0 &&
          formData.map((data, index) => {
            return (
              <div className="FormUserContent-element flex flex-row px-1 space-x-1" key={uuidv4()}>
                <p className="group flex flex-row">
                  {data.usernameusedfortweets}
                  <button
                    className="button-FormUserContent-element hidden group-hover:block pl-1"
                    onClick={() => removeFormData(index)}
                  >
                    ❌
                  </button>
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default FormUserContent;
