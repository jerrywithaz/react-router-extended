import { useContext } from "react";
import { BetterReactRoutingContext } from "../../provider/BetterReactRoutingProvider";

function useBetterReactRouting() {
    const context = useContext(BetterReactRoutingContext);

  if (context === undefined) {
    throw new Error(`useBetterReactRouting must be used within a BetterReactRoutingProvider`);
  }

  return context;
}

export default useBetterReactRouting;