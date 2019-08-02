import React, { useState } from "react";
import LoginPresenter from "./LoginPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT, CONFIRM_LOGIN, LOCAL_LOG_IN } from "./LoginQueries";

export default () => {
  const [action, setAction] = useState("logIn");
  const name = useInput("");
  const password = useInput("");
  const email = useInput("");
  const createAccountMutation = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      name: name.value,
      password: password.value
    }
  }); //아이디 생성 함수.
  const confirmLogInMutation = useMutation(CONFIRM_LOGIN, {
    variables: {
      email: email.value,
      password: password.value
    }
  }); //로그인 시도를 구현할 함수.
  const localLogInMutation = useMutation(LOCAL_LOG_IN); //로그인 성공 후 localStorage에 로그인된 아이디를 저장할 함수.

  const onSubmit = async e => {
    e.preventDefault();
    console.log(action);
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const {
            data: { requestSecret }
          } = await confirmLogInMutation();
          if (!requestSecret) {
            alert("You dont have an account yet, create one");
            setTimeout(() => setAction("signUp"), 3000);
          }
        } catch {
          alert("Can't request secret, try again");
        }
      } else {
        alert("Email is required");
      }
    } else if (action === "signUp") {
      if (email.value !== "" && name.value !== "" && password.value !== "") {
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation();
          if (!createAccount) {
            alert("Can't create account");
          } else {
            alert("Account created! Log In now");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          alert(e.message);
        }
      } else {
        alert("All field are required");
      }
    }
  };

  return (
    <LoginPresenter
      setAction={setAction}
      action={action}
      name={name}
      email={email}
      password={password}
      onSubmit={onSubmit}
    />
  );
};
