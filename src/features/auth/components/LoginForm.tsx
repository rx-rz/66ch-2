import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Form } from "src/components/Elements/Form/Form";
import { InputField } from "src/components/Elements/Form/InputField";
import { auth, database } from "src/config/firebaseConfig";
import googleLogo from "src/assets/google.svg";
import { useState } from "react";
import { Button } from "src/components/Elements/Button/Button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { errorToast } from "../api/errorToast";
import { addDoc, collection } from "firebase/firestore";
import { userConverter } from "src/utils";
import { useCollectionData } from "react-firebase-hooks/firestore";

type LoginFormValues = {
  email: string;
  password: string;
};

const date = new Date()
const googleProvider = new GoogleAuthProvider();
const ref = collection(database, "users").withConverter(userConverter);

export function LoginForm() {

  const [users] = useCollectionData(ref);
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
        .then((user) => {
          const usersInDatabase =
            users &&
            users.filter(
              (usersInDatabase) => usersInDatabase.uid === user.user.uid
            );
          if (usersInDatabase!.length === 0) {
            addDoc(collection(database, "users"), {
              name: user.user.displayName,
              photoURL: process.env.REACT_APP_DEFAULT_PFP,
              uid: user.user.uid,
              dateCreated: date.toUTCString(),
              role: "writer"
            })
          }
        })
        .catch((err) => console.log(err));
      navigate("/");
    } catch (err: any) {
      errorToast(err);
    }
  };

  const handleSubmit = async (data: LoginFormValues) => {
    try {
      setPending(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setPending(false);
      navigate("/");
    } catch (err: any) {
      setPending(false);
      errorToast(err);
    }
  };

  const handleNavigateToRegister = () => {
    navigate("/auth/register");
  };

  return (
    <div className="border border-tertiary min-h-screen">
      <div className="sm:w-8/12 w-10/12 mx-auto py-16">
        <h1 className="text-3xl text-center my-4 font-bold">Log In </h1>

        <Button
          handleClick={signInWithGoogle}
          className="flex text-2xl items-center  bg-tertiary text-white  transition-opacity duration-300  hover:opacity-80 mx-auto my-12"
        >
          <img
            src={googleLogo}
            width="40px"
            height="40px"
            alt="Google Logo"
            className=" border-primary invert"
          />
        </Button>
        <hr className="border border-black" />
        <div className="my-16">
          <Form onSubmit={handleSubmit} options={{ mode: "onBlur" }}>
            {({ register, formState }) => (
              <>
                <InputField
                  className=" border-tertiary w-full border p-1  bg-primary focus:outline-none focus:bg-white mt-2"
                  type="text"
                  label="Email"
                  error={formState.errors.email}
                  registration={register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />

                <InputField
                  className=" border-tertiary w-full border p-1  bg-primary  focus:outline-none focus:bg-white mt-2"
                  type="password"
                  label="Password"
                  error={formState.errors.password}
                  registration={register("password", {
                    minLength: {
                      value: 6,
                      message:
                        "Your password should not be less than 6 characters long",
                    },
                  })}
                />
                <div className="lg:flex mt-12 justify-between">
                  <Button
                    type="submit"
                    className="text-xl font-Synonym lg:w-5/12 w-full bg-tertiary text-white p-1 py-2 transition-opacity duration-300  hover:opacity-80"
                  >
                    {pending ? <>Loading....</> : <>Log In</>}
                  </Button>
                  <Button
                    type="submit"
                    handleClick={handleNavigateToRegister}
                    className="text-xl font-Synonym lg:w-5/12 w-full border border-tertiary bg-white text-black p-1 py-2 text-center lg:mt-0 mt-6 transition-opacity duration-300  hover:opacity-80"
                  >
                    Register
                  </Button>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}
