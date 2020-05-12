import React, { FunctionComponent } from "react";
import { HomeViewProps } from "./HomeView.types";
import useFocusOnMount from "../../hooks/useFocusOnMount";

const HomeView: FunctionComponent<HomeViewProps> = () => {

  const h1Ref = useFocusOnMount<HTMLHeadingElement>();

  return (
    <div>
      <h1 ref={h1Ref} tabIndex={-1}>
        Home View
      </h1>
    </div>
  );
};

export default HomeView;
