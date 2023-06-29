import { checkLoginData, insertLoginData } from "../../SQL";
import { useAuth } from "../../AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import "./FormTwitterCredentials.css";
import insertIntensivity from "../../SQL/InsertIntensivity";
import generateTwitterClassAndPush from "../../Functionalities/GenerateTwitterClassAndPush";

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

  return (
    <div className="FormTwitterCredentials_container flex flex-col space-y-2 text-center bg-background p-5 border-2 border-secondary">
      <p>Add Twitter Account</p>
      <form onSubmit={handleSubmit((data) => formSubmit(data))} className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="TwitterUsername"
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
