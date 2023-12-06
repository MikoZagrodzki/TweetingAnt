import React, { useRef } from "react";
import Popup from "reactjs-popup";
import FormTwitterCredentials from "../../FormTwitterCredentials/FormTwitterCredentials";
// import "../PopupMain.css";
import { TwitterAccountType } from "../../../TypesApi";
import BurstAttack from "../../burstAttack/burstAttack";
import { BUTTON_STYLING } from "../../../tailwindCustomStyles";

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
    < >
      <button
        type="button"
        className={`${BUTTON_STYLING}`}
        onClick={openTooltip}
      >
        Burst Attack
      </button>
      <Popup
        ref={ref}
      >
        <div className="Popup_Background fixed top-0 left-0 bg-highlight w-screen h-screen bg-opacity-90 flex flex-col justify-center items-center space-y-2">
          <BurstAttack twitterAccounts={twitterAccounts} setTwitterAccounts={setTwitterAccounts} closeTooltip={closeTooltip}/>
          <button
            type="button"
            className={` font-semibold  ${BUTTON_STYLING} px-2 text-white`}
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
