import React from "react";
import RouterProvider from "../../providers/RouterProvider";
import ReduxProvider, { history } from "../../providers/ReduxProvider";
import GlobalStyles from "../GlobalStyles";
import AppRoutes from '../AppRoutes';

import * as Styled from "./App.style";

function App() {

  return (
    <ReduxProvider>
      <RouterProvider history={history}>
        <GlobalStyles />
          <Styled.App>
            <AppRoutes/>
          </Styled.App>
      </RouterProvider>
    </ReduxProvider>
  );
}

export default App;
