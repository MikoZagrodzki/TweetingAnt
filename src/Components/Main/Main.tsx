import { useState, useEffect} from "react";
import { useAuth } from "../../AuthContext";
import { generateTwitterAccounts } from "../../Functionalities";
import Card from "../Card/Card";
import PopupAddAccount from "./PopupAddAccount/PopupAddAccount";
// import "./Main.css";
import { TwitterAccountType } from "../../TypesApi";
import PopupBurstAttack from "./PopupBurstAttack/PopupBurstAttack";
import { getPersonalityList } from "../../SQL";
import { v4 as uuidv4 } from "uuid";
import useScrollToTopAndNavigate from "../UseScrollToTopAndNavigate";
import { BORDER_OUTSIDE_STYLING, BUTTON_STYLING, INFO_TEXT } from "../../tailwindCustomStyles";

interface Props {
}

function Main() {
  const { currentUser, logOut }: any = useAuth();
  const [twitterAccounts, setTwitterAccounts] = useState<TwitterAccountType[] | []>([]);
  const [error, setError] = useState('');
  const [dbTrigger, setDbTrigger] = useState<boolean>(false);
  const [personalityList, setPersonalityList] = useState<string[] | []>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchPersonality, setSearchPersonality] = useState<string>("");
  const [searchEmail, setSearchEmail] = useState<string>("");

  const [isAdvancedSearchVisible, setIsAdvancedSearchVisible] = useState<boolean>(false);

  const [filteredTwitterAccounts, setFilteredTwitterAccounts]=useState<TwitterAccountType[] | []>(twitterAccounts)
  
  const navigate = useScrollToTopAndNavigate();

  
  async function handleLogout() {
    try {
      await logOut();
      navigate('/login');
    } catch(error) {
      setError('Failed to log out');
    }
  }
  
  const getLoginDataFromEmailFromSql = async () => {
    try {
      const responseWithClasses = await generateTwitterAccounts(currentUser.email);
      setTwitterAccounts(responseWithClasses);
      setFilteredTwitterAccounts(responseWithClasses)
      const personality = await getPersonalityList();
      setPersonalityList(personality);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLoginDataFromEmailFromSql();
  }, [dbTrigger]);

  let emailsNoDuplicates = twitterAccounts.map((account)=> { return account.email}).sort();
  let personalitiesNoDuplicates = twitterAccounts.map((account)=> { return account.personality}).sort();

  let emailsWhenPersonalitySelected = twitterAccounts.filter((x)=>x.personality === searchPersonality).map((account)=> { return account.email}).sort();
  let personalityWhenEmailSelected = twitterAccounts.filter((x)=>x.email === searchEmail).map((account)=> { return account.personality}).sort();

  const handleEmailSearch = (emailToSearch: string) => {
    setSearchEmail(emailToSearch);
    if (emailToSearch !== "") {
      const filtered = twitterAccounts.filter((account) =>
        account.email.toLowerCase().includes(emailToSearch.toLowerCase()) &&
        (!searchPersonality || account.personality.toLowerCase()=== searchPersonality.toLocaleLowerCase())
      )
      setFilteredTwitterAccounts(filtered.length>0?filtered:[])
    } else {
      //THIS ALLOWS YOU TO GO BACK TO ALL EMAILS/PERSONALITIES
      const personalityFiltered = twitterAccounts.filter((account) =>
      !searchPersonality || account.personality?.toLowerCase() === searchPersonality.toLowerCase()
      );
      setFilteredTwitterAccounts(personalityFiltered.length > 0 ? personalityFiltered : []);
    }
  }

  const handlePersonalitySearch = (personalityToSearch: string) => {
    setSearchPersonality(personalityToSearch);
    if (personalityToSearch !== "") {
      const filtered = twitterAccounts.filter((account) =>
      account.personality.toLowerCase().includes(personalityToSearch.toLowerCase()) &&
      (!searchEmail|| account.email.toLowerCase()===searchEmail.toLowerCase())
      )
      setFilteredTwitterAccounts(filtered.length>0?filtered:[])
    } else {
      //THIS ALLOWS YOU TO GO BACK TO ALL EMAILS/PERSONALITIES
      const emailFiltered = twitterAccounts.filter((account) =>
      !searchEmail || account.email?.toLowerCase() === searchEmail.toLowerCase()
      );
      setFilteredTwitterAccounts(emailFiltered.length > 0 ? emailFiltered : []);
    }
  }
  
  const handleSearchByName = (name:string) => {
    setSearchTerm(name);
    setFilteredTwitterAccounts(twitterAccounts.filter(
      (account) =>
        account.loginNameTwitter.toLowerCase().includes(name.toLowerCase())
    ))
  }

  const handleShowAll = () => {
    setFilteredTwitterAccounts(twitterAccounts);
    setSearchPersonality("");
    setSearchEmail("");
  }  
  
  return (
    <div id="top" className="  min-h-screen w-screen flex flex-col items-center">
      <a href="#top" className=" fixed z-20 bottom-10 right-10 font-extrabold text-2xl bg-highlight rounded-lg text-accent p-1 shadow-lg border border-accent hover:text-highlight hover:border-highlight hover:bg-accent">^</a>
      <div className="my-10 flex flex-col space-y-5 items-center">
        <h1 className="font-semibold text-center text-md sm:text-lg md:text-xl">{currentUser.email} is logged in.</h1>
        <div className="flex flex-row space-x-1 sm:space-x-2 md:space-x-3 flex-wrap justify-center gap-1">
          {(currentUser.email==="admin@admin.admin" || currentUser.email.includes("@batch")) && <PopupAddAccount dbTrigger={dbTrigger} setDbTrigger={setDbTrigger}/>}
          <PopupBurstAttack twitterAccounts={twitterAccounts} setTwitterAccounts={setTwitterAccounts}/>
          <button className={`${BUTTON_STYLING}`} onClick={()=>{window.scrollTo(0, 0); navigate('/')}}>Content</button>
          <button className={`${BUTTON_STYLING}`} onClick={()=>{window.scrollTo(0, 0); navigate('/analytics')}}>Analytics</button>
          <button className={`${BUTTON_STYLING}`} onClick={handleLogout}> Log out </button>
        </div>
        {filteredTwitterAccounts.length >0 && <p className={`${INFO_TEXT}`}>{filteredTwitterAccounts.length} Accounts</p>}
      </div>
      <div className="flex flex-row p-2 text-xs sm:text-sm md:text-base w-full justify-center ">
        {isAdvancedSearchVisible?
          <div className={`flex flex-col gap-2 md:flex-row w-full max-w-6xl items-center md:justify-center `}>
            <select value={searchPersonality} onChange={(e) => handlePersonalitySearch(String(e.target.value))} className={`${BUTTON_STYLING} w-4/6  md:w-1/3`}>
              <option key={uuidv4()} value={""}>All Personalities</option>
              {searchEmail === ""
                ? Array.from(new Set(personalitiesNoDuplicates)).map( (personality) => (
                    <option key={uuidv4()} value={personality}>{personality}</option> 
                  ))
                :
                Array.from(new Set(personalityWhenEmailSelected)).map( (personality) => (
                  <option key={uuidv4()} value={personality}>{personality}</option> 
                ))
              }
            </select>
            <select value={searchEmail} onChange={(e) => handleEmailSearch(String(e.target.value))} className={`${BUTTON_STYLING} w-4/6 md:w-1/3`}>
              <option key={uuidv4()} value="">All Emails</option>
              {searchPersonality === ""
                ? Array.from(new Set(emailsNoDuplicates)).map((email) => (
                    <option key={uuidv4()} value={email}>{email}</option>
                  ))
                : 
                Array.from(new Set(emailsWhenPersonalitySelected)).map((email) => (
                  <option key={uuidv4()} value={email}>{email}</option>
                ))
              }
            </select>
            <div className="max-w-fit flex flex-row items-center space-x-1 sm:space-x-2 md:space-x-3">
              <button onClick={()=>{setIsAdvancedSearchVisible(false)}} className={`${BUTTON_STYLING} max-w-fit`}>Search by name</button>
              {(searchPersonality !== "" || searchEmail !== "") && 
                (<button className={BUTTON_STYLING} onClick={handleShowAll}>Show All</button>
              )}
            </div>
          </div>
          :
          <div className={`flex flex-row gap-2 `}>
            <input
              className="text-black shadow-md rounded-sm text-center border border-primary focus:outline-accent px-1"
              type="text"
              placeholder="Search by username 🔎"
              value={searchTerm}
              onChange={(e) => handleSearchByName(String(e.target.value))}
            />
            <button onClick={()=>{setIsAdvancedSearchVisible(true)}} className={`${BUTTON_STYLING}`}>Advanced Search</button>
          </div>
        }
      </div>
      <ul className={`pb-10 flex flex-col space-y-5 items-center w-11/12 max-w-6xl ${BORDER_OUTSIDE_STYLING} pt-5 sm:flex-row sm:flex-wrap sm:space-x-0 sm:space-y-0 sm:justify-center`}>
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