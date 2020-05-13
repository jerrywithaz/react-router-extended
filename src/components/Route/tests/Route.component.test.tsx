import React from 'react';
import renderTestApp from './../../../testUtils/renderTestApp';
import Route from './../Route.component';
import { RouteProps } from '../Route.types';

describe("<Route/>", () => {
    it("should render non-secure route without error", () => {
        const { getByText } = renderRoute(true, {
            secure: false
        });
        expect(getByText("Welcome Home")).toBeInTheDocument();
    });
    it("should render secure route if application is authenticated", () => {
        const { getByText } = renderRoute(true, {
            secure: true
        });
        expect(getByText("Welcome Home")).toBeInTheDocument();
    });
    it("should not render secure route if application is not authenticated", () => {
        const { queryByText } = renderRoute(false, {
            secure: true
        });
        expect(queryByText("Welcome Home")).not.toBeInTheDocument();
    });
    it("should set the document title when the component renders", () => {
        renderRoute(false, {
            secure: false
        });
        expect(document.title).toBe("Home Page");
    });
    it("should display a11y message when component it rendered", () => {
        const { queryByText } = renderRoute(false, {
            secure: true
        });
        expect(queryByText("You have navigated to the Home Page")).toBeInTheDocument();
    });
});

function TestComponent() {
    return <div>Welcome Home</div>;
}

function renderRoute(authenticated: boolean, routeProps: Pick<RouteProps, "secure">) {
    const testAppProps = {
        authenticated,
        initialA11yMessage: "",
        initialDocumentTitle: ""
    };
    const result = renderTestApp(testAppProps, (
        <Route 
            exact={true}
            path="/"
            a11yMessage="You have navigated to the Home Page"
            component={TestComponent}
            key="test-route"
            title="Home Page"
            {...routeProps} />
    ));
    return result;
}
