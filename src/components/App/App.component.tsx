import React from "react";
import RouterProvider from "../../providers/RouterProvider";
import ReduxProvider, { history } from "../../providers/ReduxProvider";
import Capture404 from "../../components/Capture404";
import PageNotFound from "../../components/PageNotFound";
import GlobalStyles from "./../GlobalStyles";
import Switch from "./../Switch";
import routes from "./../../routes";

import * as Styled from "./App.style";

function App() {
  const PageFound = () => (
    <Styled.App>
      <Switch routes={routes} />
    </Styled.App>
  );

  return (
    <ReduxProvider>
      <RouterProvider history={history}>
        <GlobalStyles />
        <Capture404
          FoundComponent={PageFound}
          NotFoundComponent={PageNotFound}
        />
      </RouterProvider>
    </ReduxProvider>
  );
}

export default App;
