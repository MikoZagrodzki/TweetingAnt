import React, { useRef } from "react";
import Popup from "reactjs-popup";
import FormTwitterCredentials from "../../FormTwitterCredentials/FormTwitterCredentials";
import { BUTTON_STYLING } from "../../../tailwindCustomStyles";
// import "../PopupMain.css";

interface Props {
  dbTrigger: boolean;
  setDbTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

function PopupAddAccount(props: Props) {
  const { dbTrigger, setDbTrigger } = props;

  const ref: any = useRef();
  const openTooltip = () => ref.current.open();
  const closeTooltip = () => ref.current.close();


  return (
    <>
      <button
        type="button"
        className={`${BUTTON_STYLING}`}
        onClick={openTooltip}
      >
        Add Account
      </button>
      <Popup
        ref={ref}
        //   trigger={
        //     <button type="button" className="button" onClick={openTooltip}>
        //     open
        //   </button>
        //   }
      >
        <div className={`text-white w-screen h-screen fixed top-0 left-0 bg-highlight bg-opacity-90 flex flex-col justify-center items-center space-y-2`}>
          <FormTwitterCredentials
            setDbTrigger={setDbTrigger}
            dbTrigger={dbTrigger}
          />
          <button
            className={`${BUTTON_STYLING} font-semibold px-2 text-white`}
            type="button"
            // className="AddAccount closeButton"
            onClick={closeTooltip}
          >
            close
          </button>
        </div>
      </Popup>
    </>
  );
}

export default PopupAddAccount;
