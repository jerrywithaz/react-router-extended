import React, { FunctionComponent } from "react";
import { Http } from "@status/codes";
import { UnauthorizedRedirect } from '@jerrywithaz/better-react-router-routing';
import useUser from "../../hooks/useUser";
import { UserViewProps } from "./UserView.types";
import useFocusOnMount from "../../hooks/useFocusOnMount";

const UserView: FunctionComponent<UserViewProps> = ({
  redirectPath
}) => {
  const user = useUser();

  const h1Ref = useFocusOnMount<HTMLHeadingElement>();
  
  if (!user) return (
    <UnauthorizedRedirect 
      componentRedirectPath={redirectPath} 
      reason={Http.BadRequest} />
  );

  return (
    <React.Fragment>
      <div>
        <h1 tabIndex={-1} ref={h1Ref}>
          Welcome back, {user.firstName} {user.lastName}!
        </h1>
      </div>
    </React.Fragment>
  );
};

export default UserView;
