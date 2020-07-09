import React from "react";
import { MemoryRouter } from "react-router-dom";
import BetterReactRoutingProvider, {
  BetterReactRoutingProviderProps,
} from "./../../provider/BetterReactRoutingProvider";
import { MemoryRouterProps } from "react-router";
import Switch from "../../components/Switch";

export type TestAppWrapperProps = Omit<
  BetterReactRoutingProviderProps,
  "FoundComponent"
> &
  MemoryRouterProps & {
    FoundComponent?: BetterReactRoutingProviderProps["FoundComponent"];
  };

function createTestAppWrapper({
  initialEntries,
  initialIndex,
  keyLength,
  getUserConfirmation,
  FoundComponent,
  routes,
  ...betterReactRoutingProviderProps
}: TestAppWrapperProps): JSX.Element {
  const DefaultFoundComponent = () => <Switch routes={routes} />;
  return (
    <MemoryRouter
      initialEntries={initialEntries}
      initialIndex={initialIndex}
      keyLength={keyLength}
      getUserConfirmation={getUserConfirmation}
    >
      <BetterReactRoutingProvider
        {...betterReactRoutingProviderProps}
        FoundComponent={FoundComponent || DefaultFoundComponent}
        routes={routes}
      />
    </MemoryRouter>
  );
}

export default createTestAppWrapper;
