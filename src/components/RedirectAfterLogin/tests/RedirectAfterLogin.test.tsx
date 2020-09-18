import createRoutes from "../../../testUtils/createTestRoutes";
import { RouteConfig } from "../../../types";
import createTestAppWrapper, { TestAppWrapperProps } from "../../../testUtils/createTestAppWrapper";
import { act, render } from "@testing-library/react";

describe("<RedirectAfterLogin/>", () => {
  it("should redirect to the `redirectPathAfterLogin` path once authenticated is true", () => {

    const { rerender } = render(renderRedirectAfterLogin(false, { secure: true }));

    expect(document.title).not.toBe("Home");

    act(() => {
      rerender(renderRedirectAfterLogin(true, { secure: true }));
    });

    expect(document.title).toBe("Home");

  });

});

function renderRedirectAfterLogin(
  authenticated: boolean,
  homepageRoutesProps?: Partial<RouteConfig>,
  testAppWrapperProps?: Partial<TestAppWrapperProps>,
  initialEntries?: string[],
  redirectPathAfterLogin?: string
) {
  const testAppProps = {
    authenticated,
    initialA11yMessage: "",
    initialDocumentTitle: "",
    initialEntries: initialEntries || ["/login"],
    initialIndex: 0,
    routes: createRoutes(homepageRoutesProps),
    redirectPathAfterLogin: redirectPathAfterLogin || "/",
    ...(testAppWrapperProps || {}),
  };
  return createTestAppWrapper(testAppProps);
}
