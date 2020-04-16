import React, { FunctionComponent } from "react";
import DocumentTitle from "../../components/DocumentTitle";
import { RedirectToLogin } from '@jerrywithaz/better-react-router-routing';
import useUser from "../../hooks/useUser";
import { Http } from "@status/codes";

const UserView: FunctionComponent = () => {
  const user = useUser();

  if (!user) return <RedirectToLogin reason={Http.BadRequest} />;

  return (
    <React.Fragment>
      <DocumentTitle title="Home - User" />
      <div>
        Welcome back, {user.firstName} {user.lastName}!
      </div>
    </React.Fragment>
  );
};

export default UserView;