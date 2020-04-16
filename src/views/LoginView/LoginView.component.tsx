import React, { FunctionComponent, useState } from "react";
import { Redirect } from "react-router";
import { Http } from "@status/codes";
import useAuth from "./../../hooks/useAuth";
import useAuthenticated from "../../hooks/useAuthenticated";
import DocumentTitle from "../../components/DocumentTitle";
import { LoginViewProps } from "./LoginView.types";
import LoginViewForm from "./components/LoginViewForm";

const LoginView: FunctionComponent<LoginViewProps> = ({
  location
}: LoginViewProps) => {
  const { login } = useAuth();
  const authenticated = useAuthenticated();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { state: locationState = {} } = location;

  if (authenticated) {
    return <Redirect to="/home" />;
  }

  function onLoginFormSubmit() {
    login(username, password);
  }

  return (
    <div>
      <DocumentTitle title="Login" />
      {locationState.from &&
        ((locationState.status === Http.Unauthorized && (
          <div>You are not authorized to view that page.</div>
        )) ||
          (locationState.status === Http.NotFound && (
            <div>Hmm...We couldn't find that page.</div>
          )))}
      <LoginViewForm
        username={username}
        password={password}
        setPassword={setPassword}
        setUsername={setUsername}
        onSubmit={onLoginFormSubmit}
      />
    </div>
  );
};

export default LoginView;
