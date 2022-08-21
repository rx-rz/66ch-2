import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Form } from "src/components/Elements/Form/Form";
import { InputField } from "src/components/Elements/Form/InputField";

import googleLogo from "src/assets/google.svg";
import { RegisterFormValues } from "../types";
import { Button } from "src/components/Elements/Button/Button";
import { errorToast } from "../api/errorToast";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { database } from "src/config/firebaseConfig";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { userConverter } from "src/utils";

const auth = getAuth();
const date = new Date();
const googleProvider = new GoogleAuthProvider();

const ref = collection(database, "users").withConverter(userConverter);
const usersRef = collection(database, "users");

export function RegisterForm() {
  const [users] = useCollectionData(ref);
  const [pending, setPending] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (data: RegisterFormValues) => {
    try {
      setPending(true);
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then((user) => {
        updateProfile(user.user, {
          displayName: data.firstName + " " + data.lastName,
          photoURL: process.env.REACT_APP_DEFAULT_PFP,
        });
        addDoc(usersRef, {
          name: data.firstName + " " + data.lastName,
          photoURL: process.env.REACT_APP_DEFAULT_PFP,
          uid: user.user.uid,
          dateCreated: date.toUTCString(),
          role: "writer"
        });
        navigate("/");
      });
      setPending(false);
    } catch (err: any) {
      setPending(false);
      errorToast(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((user) => {
        addDoc(usersRef, {
          name: user.user.displayName,
          photoURL: process.env.REACT_APP_DEFAULT_PFP,
          uid: user.user.uid,
          dateCreated: date.toUTCString(),
        });
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
            role: "writer",
          });
        }
      });
      navigate("/");
    } catch (err: any) {
      setPending(false);
      errorToast(err);
    }
  };

  const handleNavigateToLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div className="border border-tertiary min-h-screen">
      <div className="sm:w-8/12 w-10/12 mx-auto py-">
        <h1 className="text-3xl text-center my-4 font-bold">Create Account</h1>

        <Button
          handleClick={signInWithGoogle}
          className="flex text-2xl items-center  bg-tertiary text-white  transition-opacity duration-300  hover:opacity-80 mx-auto my-12"
        >
          <img
            src={googleLogo}
            width="40px"
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
                  label="First Name"
                  error={formState.errors.firstName}
                  registration={register("firstName", {
                    required: "Please enter your first name",
                  })}
                />

                <InputField
                  className=" border-tertiary w-full border p-1  bg-primary focus:outline-none focus:bg-white mt-2"
                  type="text"
                  label="Last Name"
                  error={formState.errors.lastName}
                  registration={register("lastName", {
                    required: "Please enter your last name",
                  })}
                />

                <InputField
                  className=" border-tertiary w-full border p-1  bg-primary focus:outline-none focus:bg-white mt-2"
                  type="email"
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
                  className=" border-tertiary w-full border p-1  bg-primary focus:outline-none focus:bg-white mt-2"
                  type="password"
                  label="Password"
                  error={formState.errors.password}
                  registration={register("password", {
                    minLength: {
                      value: 8,
                      message:
                        "Your password should not be less than 6 characters",
                    },
                  })}
                />

                <div className="lg:flex mt-12 justify-between">
                  <Button
                    type="submit"
                    className="text-xl font-Synonym lg:w-5/12 w-full border border-black bg-tertiary text-primary p-1 py-2 text-center lg:mt-0 mt-6 transition-opacity duration-300  hover:opacity-80 mb-8 lg:mb-0"
                  >
                    {!pending ? <>Register</> : <>Loading...</>}
                  </Button>
                  <Button
                    handleClick={handleNavigateToLogin}
                    className="text-xl font-Synonym border border-tertiary lg:w-5/12 w-full bg-white text-tertiary p-1 py-2 transition-opacity duration-300  hover:opacity-80"
                  >
                    Log In
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
