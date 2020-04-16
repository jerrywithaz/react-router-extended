import React, { FunctionComponent } from "react";
import { Http } from "@status/codes";
import { UnauthorizedRedirect } from '@jerrywithaz/better-react-router-routing';
import DocumentTitle from "../../components/DocumentTitle";
import useUser from "../../hooks/useUser";
import { UserViewProps } from "./UserView.types";

const UserView: FunctionComponent<UserViewProps> = ({
  redirectPath
}) => {
  const user = useUser();

  if (!user) return (
    <UnauthorizedRedirect 
      componentRedirectPath={redirectPath} 
      reason={Http.BadRequest} />
  );

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
