import { useContext } from "react";
import { BetterReactRoutingContext, BetterReactRoutingContextValue } from "../../provider/BetterReactRoutingProvider";

function useBetterReactRouting(): BetterReactRoutingContextValue {
    const context = useContext(BetterReactRoutingContext);

  if (context === undefined) {
    throw new Error(`useBetterReactRouting must be used within a BetterReactRoutingProvider`);
  }

  return context;
}

export default useBetterReactRouting;