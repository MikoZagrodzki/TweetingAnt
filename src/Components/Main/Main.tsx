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
  const [searchTerm, setSearchTerm] = useState<string>('');
  
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

  const filteredTwitterAccounts = twitterAccounts.filter(
    (account) =>
      account.loginNameTwitter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="top" className="  min-h-screen w-screen flex flex-col items-center">
      <a href="#top" className=" fixed z-20 bottom-10 right-10 font-extrabold text-2xl bg-highlight rounded-lg text-accent p-1 shadow-lg border border-accent hover:text-highlight hover:border-highlight hover:bg-accent">^</a>
      <div className="my-10 flex flex-col space-y-5 items-center">
        <h1 className="font-semibold text-center text-md sm:text-lg md:text-xl">{currentUser.email} is logged in.</h1>
        <div className="flex flex-row space-x-3">
          <PopupAddAccount
            dbTrigger={dbTrigger}
            setDbTrigger={setDbTrigger}
          />
          <PopupBurstAttack twitterAccounts={twitterAccounts} setTwitterAccounts={setTwitterAccounts}/>
          <button className="text-xs sm:text-sm  whitespace-nowrap bg-secondary font-semibold px-1 rounded-sm border border-accent hover:bg-accent hover:text-white hover:border-primary shadow-md" onClick={handleLogout}> Log out </button>
        </div>
      </div>
      <div className="flex flex-row p-2 text-xs sm:text-sm md:text-base">
        <input
          className="shadow-md rounded-sm text-center border border-primary focus:outline-accent"
          type="text"
          placeholder="Search by username 🔎"
          value={searchTerm}
          onChange={(e) => setSearchTerm(String(e.target.value))}
        />
        
      </div>
      <ul className="pb-10 flex flex-col space-y-5 items-center w-11/12 max-w-6xl border border-primary pt-5 sm:flex-row sm:flex-wrap sm:space-x-0 sm:space-y-0 sm:justify-center">
        {filteredTwitterAccounts.length > 0 ? (
          filteredTwitterAccounts.map((x) => (
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
          ))
        ) : (
          <li>No matching accounts found.</li>
        )}
      </ul>
    </div>
  );
}

export default Main;