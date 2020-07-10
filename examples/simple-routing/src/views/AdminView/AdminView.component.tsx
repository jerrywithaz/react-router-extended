import React, { FunctionComponent } from "react";
import { AdminViewProps } from "./AdminView.types";
import useFocusOnMount from "../../hooks/useFocusOnMount";

const AdminView: FunctionComponent<AdminViewProps> = () => {

  const h1Ref = useFocusOnMount<HTMLHeadingElement>();
  
  return (
    <React.Fragment>
      <div>
        <h1 tabIndex={-1} ref={h1Ref}>
          Welcome to the admin screen!
        </h1>
      </div>
    </React.Fragment>
  );
};

export default AdminView;
