import React, { FunctionComponent } from "react";
import { HomeViewProps } from "./HomeView.types";
import DocumentTitle from "./../../components/DocumentTitle";

const HomeView: FunctionComponent<HomeViewProps> = () => {
  return (
    <div>
      <DocumentTitle title="Home" />
      Home View
    </div>
  );
};

export default HomeView;
