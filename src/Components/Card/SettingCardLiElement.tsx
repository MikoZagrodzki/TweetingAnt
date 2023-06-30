import React, { useEffect, useState } from "react";
import "./Card.css";
import { v4 as uuidv4 } from "uuid";
import { TwitterAccountType } from "../../TypesApi";

interface Props {
    loginNameTwitter: string;
    purpose: string;
    hours:number;
    minutes:number;
    twitterAccounts: TwitterAccountType[];
    setTwitterAccounts: React.Dispatch<React.SetStateAction<[] | TwitterAccountType[]>>;
  }
interface Times{
  hours?:number;
  minutes?:number
}

function SettingCardLiElement(props:Props) {
    const { loginNameTwitter, purpose, hours, minutes, twitterAccounts, setTwitterAccounts } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [times, setTimes]=useState<Times>({})
    const [hoursState, setHoursState] = useState(hours);
    const [minutesState, setMinutesState] = useState(minutes);
  
    const twitterClassAccount = twitterAccounts.find(
      (account) => account.loginNameTwitter === loginNameTwitter
    );

    const deleteSpecificTime = async (hours: number, minutes: number) => {
      try {
        switch (purpose) {
          case "tweet":
            if (twitterClassAccount && typeof twitterClassAccount.removeTimesToTweet === 'function') {
              twitterClassAccount.removeTimesToTweet(hours, minutes);
            }
            break;
          case "like":
            if (twitterClassAccount && typeof twitterClassAccount.removeTimesToLike === 'function') {
              twitterClassAccount.removeTimesToLike(hours, minutes);
            }
            break;
          case "retweet":
            if (twitterClassAccount && typeof twitterClassAccount.removeTimesToRetweet === 'function') {
              twitterClassAccount.removeTimesToRetweet(hours, minutes);
            }
            break;
          case "comment":
            if (twitterClassAccount && typeof twitterClassAccount.removeTimesToComment === 'function') {
              twitterClassAccount.removeTimesToComment(hours, minutes);
            }
            break;
            default:
              break;
            }
            setTwitterAccounts([...twitterAccounts]);
      }catch(error){
        console.error(error)
      }
    };

    const updateSpecificTime = async (hours: number, minutes: number, updatedHours:number, updatedMinutes:number) => {
        try {
          switch (purpose) {
            case "tweet":
              if (twitterClassAccount && typeof twitterClassAccount.updateTimesToTweet === 'function') {
                twitterClassAccount.updateTimesToTweet(hours, minutes, updatedHours, updatedMinutes);
              }
              break;
            case "like":
              if (twitterClassAccount && typeof twitterClassAccount.updateTimesToLike === 'function') {
                twitterClassAccount.updateTimesToLike(hours, minutes, updatedHours, updatedMinutes);
              }
              break;
            case "retweet":
              if (twitterClassAccount && typeof twitterClassAccount.updateTimesToRetweet === 'function') {
                twitterClassAccount.updateTimesToRetweet(hours, minutes, updatedHours, updatedMinutes);
              }
              break;
            case "comment":
              if (twitterClassAccount && typeof twitterClassAccount.updateTimesToComment === 'function') {
                twitterClassAccount.updateTimesToComment(hours, minutes, updatedHours, updatedMinutes);
              }
              break;
            default:
              break;
          }
        }catch(error){
          console.error(error)
        }
        setIsEditing(!isEditing)
        setTwitterAccounts([...twitterAccounts]);
      };

      function inputValueHours(e: React.ChangeEvent<HTMLInputElement>){
        const value = Number(e.target.value)
        if (value >= 0 && value <= 23) {
          setHoursState(value)
          setTimes({...times, hours: value})
        }else{
          alert('Please enter a valid time in the format HH:MM');
        }
      }
      function inputValueMinutes(e: React.ChangeEvent<HTMLInputElement>){
        const value = Number(e.target.value)
        if (value >= 0 && value <= 59) {
          setMinutesState(value)
          setTimes({...times, minutes: value})
        }else{
          alert('Please enter a valid time in the format HH:MM');
        }
      }
      
      function isEditingTrigger(hours:number, minutes:number){
        setTimes({hours: hours, minutes: minutes})
        setIsEditing(!isEditing)
      }




  return (
    <li key={uuidv4()}>
    {!isEditing ? (
      <div className="setting-li-element flex flex-row w-8 p-1 mx-2 sm:mx-2">
          <p className="cursor-pointer" onClick={() => {isEditingTrigger(hours, minutes)}}>{hours}:{minutes}</p>
      </div>
    ) : (
      <div className="setting-li-editing flex flex-row p-1 sm:mx-2">
        <button className="button-li" onClick={() => {deleteSpecificTime(hours, minutes)}}>❌</button>
        <input className="w-fit focus:outline-none border-dotted text-center border-r border-r-accent border-b border-b-accent border-t border-t-accent" type="number" name="hours" value={times.hours || ''} defaultValue={hours} onChange={inputValueHours} autoFocus min="0" max="23"></input>
        <input className="w-fit focus:outline-none border-dotted text-center border-b border-b-accent border-t border-t-accent" type="number" name="minutes" value={times.minutes || ''} defaultValue={minutes} onChange={inputValueMinutes} autoFocus min="0" max="59"></input>
        <button className="setting-edit-input-button" onClick={()=>{updateSpecificTime(hours, minutes, hoursState, minutesState)}}>✅</button>
      </div>
    )}
  </li>
  )
}

export default SettingCardLiElement