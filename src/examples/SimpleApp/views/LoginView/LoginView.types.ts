import { RouteConfigComponentProps } from "../../../../lib/types";
import { Http } from "@status/codes";

export type LoginViewParams = {
  code?: string;
};

export type LoginViewLocationState = {
  from?: string;
  status?: Http;
};

export type LoginViewProps = RouteConfigComponentProps<
  LoginViewParams,
  LoginViewLocationState
> & {};
