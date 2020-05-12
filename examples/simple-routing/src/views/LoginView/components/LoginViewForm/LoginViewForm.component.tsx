import React, { FunctionComponent } from "react";
import { LoginViewFormProps } from "./LoginViewForm.types";

const LoginViewForm: FunctionComponent<LoginViewFormProps> = ({
  onSubmit,
  username,
  setPassword,
  setUsername,
  password
}) => {
  function onUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.nativeEvent.target as HTMLInputElement;

    setUsername(input.value);
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.nativeEvent.target as HTMLInputElement;

    setPassword(input.value);
  }

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="username"
        onChange={onUsernameChange}
        autoFocus={true}
        value={username}
      />
      <input
        type="password"
        placeholder="password"
        onChange={onPasswordChange}
        value={password}
      />
      <button type="button" onClick={onSubmit}>
        Login
      </button>
    </React.Fragment>
  );
};

export default LoginViewForm;
