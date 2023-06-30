import React, { useRef } from "react";
import Popup from "reactjs-popup";
import FormTwitterCredentials from "../../FormTwitterCredentials/FormTwitterCredentials";
// import "../PopupMain.css";
import { TwitterAccountType } from "../../../TypesApi";
import BurstAttack from "../../burstAttack/burstAttack";

interface Props {
    twitterAccounts: TwitterAccountType[];
    setTwitterAccounts: React.Dispatch<React.SetStateAction<[] | TwitterAccountType[]>>;
}

function PopupLikesAttack(props: Props) {
    const { twitterAccounts, setTwitterAccounts } = props;

  const ref: any = useRef();
  const openTooltip = () => ref.current.open();
  const closeTooltip = () => ref.current.close();

  return (
    <>
      <button
        type="button"
        className="AddAccount openButton text-xs sm:text-sm whitespace-nowrap bg-secondary font-semibold px-1 rounded-sm border border-accent hover:bg-accent hover:text-white hover:border-primary shadow-md"
        onClick={openTooltip}
      >
        Burst Attack
      </button>
      <Popup
        ref={ref}
      >
        <div className="Popup_Background fixed top-0 left-0 bg-highlight w-screen h-screen bg-opacity-95 flex flex-col justify-center items-center space-y-2">
          <BurstAttack twitterAccounts={twitterAccounts} setTwitterAccounts={setTwitterAccounts} closeTooltip={closeTooltip}/>
          <button
            type="button"
            className="bg-secondary text-sm sm:text-base font-semibold px-2 rounded-sm hover:bg-accent hover:text-white shadow-md"
            onClick={closeTooltip}
          >
            close
          </button>
        </div>
      </Popup>
    </>
  );
}

export default PopupLikesAttack;
