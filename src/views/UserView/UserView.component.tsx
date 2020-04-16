import React, { FunctionComponent } from "react";
import DocumentTitle from "../../components/DocumentTitle";
import RedirectToLogin from "../../components/RedirectToLogin";
import useUser from "../../hooks/useUser";
import { Http } from "@status/codes";

const UserView: FunctionComponent = () => {
  const user = useUser();

  if (!user) return <RedirectToLogin status={Http.BadRequest} />;

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
