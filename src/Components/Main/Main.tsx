import { useState, useEffect} from "react";
import { useAuth } from "../../AuthContext";
import { generateTwitterAccounts } from "../../Functionalities";
import Card from "../Card/Card";
import PopupAddAccount from "./PopupAddAccount/PopupAddAccount";
// import "./Main.css";
import { useNavigate } from "react-router-dom";
import { TwitterAccountType } from "../../TypesApi";
import PopupBurstAttack from "./PopupBurstAttack/PopupBurstAttack";
import { getPersonalityList } from "../../SQL";

interface Props {
}

function Main() {
  const { currentUser, logOut }: any = useAuth();
  const [twitterAccounts, setTwitterAccounts] = useState<TwitterAccountType[] | []>([]);
  const [error, setError] = useState('');
  const [dbTrigger, setDbTrigger] = useState<boolean>(false);
  const [personalityList, setPersonalityList] = useState<string[] | []>([]);
  
  const navigate = useNavigate();

  
  async function handleLogout() {
    try {
      await logOut();
      navigate('/login', { replace: true });
    } catch(error) {
      setError('Failed to log out');
    }
  }
  
  const getLoginDataFromEmailFromSql = async () => {
    try {
      const responseWithClasses = await generateTwitterAccounts(currentUser.email);
      setTwitterAccounts(responseWithClasses);
      const personality = await getPersonalityList();
      setPersonalityList(personality);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLoginDataFromEmailFromSql();
  }, [dbTrigger]);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center">
      <div className="my-10 flex flex-col space-y-5">
        <h1 className="font-semibold text-center text-md">{currentUser.email} is logged in.</h1>
        <div className="flex flex-row space-x-3">
          <PopupAddAccount
            dbTrigger={dbTrigger}
            setDbTrigger={setDbTrigger}
          />
          <PopupBurstAttack twitterAccounts={twitterAccounts} setTwitterAccounts={setTwitterAccounts}/>
          <button className="text-xs whitespace-nowrap bg-secondary font-semibold px-1 rounded-sm border border-accent hover:bg-accent hover:text-white hover:border-primary shadow-md" onClick={handleLogout}> Log out </button>
        </div>
      </div>
      {/* <div className="listOfCards-container "> */}
        <ul className="flex flex-col space-y-5 items-center w-11/12 max-w-6xl border border-primary pt-5 sm:flex-row sm:flex-wrap sm:space-x-0 sm:space-y-0 sm:justify-center">
          {twitterAccounts.length > 0 &&
            twitterAccounts.map((x) => {
              return (
                <li key={x.id} className="shadow-md sm:p-1">
                  <Card
                    loginNameTwitter={x.loginNameTwitter}
                    email={x.email}
                    isAutomated={x.isAutomated}
                    timesToTweet={x.timesToTweet}
                    timesToLike={x.timesToLike}
                    timesToRetweet={x.timesToRetweet}
                    timesToComment={x.timesToComment}
                    usernameForTweets={x.usernameForTweets}
                    usernameForContent={x.usernameForContent}
                    twitterAccounts={twitterAccounts}
                    setTwitterAccounts={setTwitterAccounts}
                    personalityList={personalityList}
                  />
                </li>
              );
            })}
        </ul>
      {/* </div> */}
    </div>
  );
}

export default Main;