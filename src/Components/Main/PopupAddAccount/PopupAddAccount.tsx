import React, { useRef } from "react";
import Popup from "reactjs-popup";
import FormTwitterCredentials from "../../FormTwitterCredentials/FormTwitterCredentials";
// import "../PopupMain.css";
import classnames from 'classnames';


interface Props {
  dbTrigger: boolean;
  setDbTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

function PopupAddAccount(props: Props) {
  const { dbTrigger, setDbTrigger } = props;

  const ref: any = useRef();
  const openTooltip = () => ref.current.open();
  const closeTooltip = () => ref.current.close();

  const BUTTON_STYLING =classnames('text-xs sm:text-sm whitespace-nowrap bg-secondary font-semibold px-1 rounded-full border border-accent hover:bg-accent hover:text-white hover:border-primary shadow-md')
  const INFO_TEXT = classnames('text-xs md:text-sm whitespace-nowrap');
  const TWEET_TEXT = classnames('text-xs sm:text-sm');
  const BORDER_STYLING = classnames('border border-1 border-white border-opacity-30');
  const SHADOW_STYLING = classnames('shadow-md hover:shadow-xl');
  const BUTTON_SPECIAL = classnames(' bg-highlight rounded-full font-bold text-accent p-1 shadow-lg border-2 border-accent hover:text-white hover:border-white hover:bg-secondary hover:shadow-2xl');
  

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
        <div className="w-screen h-screen fixed top-0 left-0 bg-highlight bg-opacity-95 flex flex-col justify-center items-center space-y-2">
          <FormTwitterCredentials
            setDbTrigger={setDbTrigger}
            dbTrigger={dbTrigger}
          />
          <button
            className="bg-secondary font-semibold px-2 rounded-sm hover:bg-accent hover:text-white shadow-md"
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
