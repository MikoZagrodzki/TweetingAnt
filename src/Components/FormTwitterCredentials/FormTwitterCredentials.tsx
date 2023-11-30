import { checkLoginData, insertLoginData } from "../../SQL";
import { useAuth } from "../../AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import "./FormTwitterCredentials.css";
import insertIntensivity from "../../SQL/InsertIntensivity";
import generateTwitterClassAndPush from "../../Functionalities/GenerateTwitterClassAndPush";
import classnames from 'classnames';


interface Props {
  dbTrigger: boolean;
  setDbTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

function FormTwitterCredentials(props: Props) {
  const { dbTrigger, setDbTrigger } = props;
  const [errorMessageLoginData, seterrorMessageLoginData] =
    useState<boolean>(false);
  const { currentUser }: any = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data: any) => {
    try {
      const checkedLoginData = await checkLoginData(
        data.TwitterUsername,
        data.TwitterPassword
      );
      if (checkedLoginData) {
        seterrorMessageLoginData(true);
        return;
      }
      await insertLoginData(
        currentUser.email,
        data.TwitterUsername,
        data.TwitterPassword
      );
      await insertIntensivity(currentUser.email, data.TwitterUsername)
      await generateTwitterClassAndPush(data.TwitterUsername, data.TwitterPassword, currentUser.email)
      setDbTrigger(!dbTrigger)
      seterrorMessageLoginData(false);
      reset();
    }catch (error){
      console.error(error)
    }
  };

  const BUTTON_STYLING =classnames('text-xs sm:text-sm whitespace-nowrap bg-secondary font-semibold px-1 rounded-full border border-accent hover:bg-accent hover:text-white hover:border-primary shadow-md')
  const INFO_TEXT = classnames('text-xs md:text-sm whitespace-nowrap');
  const TWEET_TEXT = classnames('text-xs sm:text-sm');
  const BORDER_OUTSIDE_STYLING = classnames('border border-2 border-secondary border-opacity-20');
  const BORDER_STYLING = classnames('border border-2 border-white border-opacity-20');
  const SHADOW_STYLING = classnames('shadow-md hover:shadow-xl');
  const BUTTON_SPECIAL = classnames(' bg-highlight rounded-md font-bold text-accent p-1 shadow-lg border-2 border-accent hover:text-white hover:border-highlight hover:bg-accent hover:shadow-2xl');
  
  

  return (
    <div className="FormTwitterCredentials_container flex flex-col space-y-2 text-center bg-background p-5 border-2 border-secondary w-11/12 max-w-md">
      <p className="text-xs sm:text-sm md:text-base">Add Twitter Account</p>
      <form onSubmit={handleSubmit((data) => formSubmit(data))} className="flex flex-col space-y-2 text-sm sm:text-base">
        <input
          type="text"
          placeholder="Twitter Username or Email"
          {...register("TwitterUsername", { required: true })}
        />
        {errors.TwitterUsername && <p>Twitter Username is required.</p>}
        <input
          type="password"
          placeholder="TwitterPassword"
          {...register("TwitterPassword", { required: true, minLength: 8 })}
        />
        {errors.TwitterPassword && (
          <p>Twitter Password is required and must be at least 8 characters.</p>
        )}
        {errorMessageLoginData && <p>Twitter Username already added.</p>}
        <input type="submit" className="bg-secondary font-semibold px-2 rounded-sm hover:bg-accent hover:text-white shadow-md"/>
      </form>
    </div>
  );
}

export default FormTwitterCredentials;
