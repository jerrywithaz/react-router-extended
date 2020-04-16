import * as React from "react";
import { render } from "react-dom";

import App from "./examples/SimpleApp/components/App";

const rootElement = document.getElementById("root");

render(<App />, rootElement);
