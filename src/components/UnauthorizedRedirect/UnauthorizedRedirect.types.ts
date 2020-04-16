import { Http } from "@status/codes";
import { RedirectPath } from "../../types";

export type UnauthorizedRedirectProps = {
  componentRedirectPath?: RedirectPath;
  componentProps?: any;
  reason: Http;
};
