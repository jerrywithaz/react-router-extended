import renderTestApp from './../../../testUtils/renderTestApp';
import createRoutes from '../../../testUtils/routes';

describe("<Route/>", () => {
    it("should render non-secure route without error", () => {
        const { getByText } = renderRoute(true, false);
        expect(getByText("Home")).toBeInTheDocument();
    });
    it("should render secure route if application is authenticated", () => {
        const { getByText } = renderRoute(true, true);
        expect(getByText("Home")).toBeInTheDocument();
    });
    it("should not render secure route if application is not authenticated", () => {
        const { queryByText } = renderRoute(false, true);
        expect(queryByText("Home")).not.toBeInTheDocument();
    });
    it("should set the document title when the component renders", () => {
        renderRoute(false, false);
        expect(document.title).toBe("Home");
    });
    it("should display a11y message when component it rendered", () => {
        const { queryByText } = renderRoute(false, false);
        expect(queryByText("You have navigated to the Home Page")).toBeInTheDocument();
    });
});
  
function renderRoute(authenticated: boolean, secureHomePageRoute: boolean) {
    const testAppProps = {
        authenticated,
        initialA11yMessage: "",
        initialDocumentTitle: "",
        initialEntries: ["/"],
        initialIndex: 0,
        routes: createRoutes(secureHomePageRoute)
    };
    const result = renderTestApp(testAppProps);
    return result;
}
