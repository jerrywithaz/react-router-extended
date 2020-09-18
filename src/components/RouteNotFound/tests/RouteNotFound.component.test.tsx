import React from 'react';
import renderTestApp from './../../../testUtils/renderTestApp';
import RouteNotFound from './../RouteNotFound.component';
import createRoutes from '../../../testUtils/createTestRoutes';

describe("<RouteNotFound/>", () => {
    it("should set the document title to the default page not found title when component rendered", async () => {
        renderRouteNotFound();
        expect(document.title).toBe("Page Not Found");
    });
    it("should display default a11y message when rendered", async () => {
        const { queryByText } = await renderRouteNotFound();
        expect(queryByText("This page could not be found.")).toBeInTheDocument();
    });
    describe("when `pageNotFoundDocumentTitle` is set in <BetterReactRoutingProvider/>", () => {
        it("should set the document title to the `pageNotFoundDocumentTitle` when rendered", async () => {
            renderRouteNotFound("", "Test - Page Not Found");
            expect(document.title).toBe("Test - Page Not Found");
        });
    });
    describe("when `pageNotFoundA11yMessage` is set in <BetterReactRoutingProvider/>", () => {
        it("should display `pageNotFoundA11yMessage` message when rendered", async () => {
            const { queryByText } = await renderRouteNotFound("404 Error - Page Not Found");
            expect(queryByText("404 Error - Page Not Found")).toBeInTheDocument();
        });
    });
});

async function renderRouteNotFound(pageNotFoundA11yMessage?: string, pageNotFoundDocumentTitle?: string) {
    const testAppProps = {
        authenticated: false,
        initialA11yMessage: "",
        initialDocumentTitle: "",
        pageNotFoundA11yMessage,
        pageNotFoundDocumentTitle,
        initialEntries: ["/unknown"],
        routes: createRoutes(),
        redirectPathAfterLogin: "/admin"
    };
    const result = await renderTestApp(testAppProps);
    return result;
}
