import React from 'react';
import renderTestApp from './../../../testUtils/renderTestApp';
import createRoutes from '../../../testUtils/routes';
import { RouteConfig } from '../../../types';
import { TestAppWrapperProps } from '../../../testUtils/createTestAppWrapper';

describe("<Route/>", () => {

    describe("accessibility", () => {
        it("should set the document title when the component renders", () => {
            renderRoute(false, { secure: false });
            expect(document.title).toBe("Home");
        });
        it("should display a11y message when component it rendered", () => {
            const { queryByText } = renderRoute(false, { secure: false });
            expect(queryByText("You have navigated to the Home Page")).toBeInTheDocument();
        });
    });

    describe("authentication", () => {
        it("should render non-secure route without error", () => {
            const { getByText } = renderRoute(true, { secure: false });
            expect(getByText("Home")).toBeInTheDocument();
        });
        it("should render secure route if application is authenticated", () => {
            const { getByText } = renderRoute(true, { secure: true });
            expect(getByText("Home")).toBeInTheDocument();
        });
        it("should not render secure route if application is not authenticated", () => {
            const { queryByText } = renderRoute(false, { secure: true });
            expect(queryByText("Home")).not.toBeInTheDocument();
        });
    });

    describe("permissions", () => {
        it("should not render route if the user does not have at least 1 of the required permissions", () => {
            const { queryByText } = renderRoute(true, { secure: true, permissions: ["admin.read"] });
            expect(queryByText("Home")).not.toBeInTheDocument();
        });
        it("should render route if the user does has at least 1 of the required permissions", () => {
            const { queryByText } = renderRoute(true, { secure: true, permissions: ["admin.read"] }, { permissions: ["admin.read", "admin.write"] });
            expect(queryByText("Home")).toBeInTheDocument();
        });
        it("should not render route if the user does not have all of the required permissions", () => {
            const { queryByText } = renderRoute(true, { secure: true, permissions: ["admin.read", "admin.write"], requireAllPermissions: true }, { permissions: ["admin.read"] });
            expect(queryByText("Home")).not.toBeInTheDocument();
        });
        it("should render route if the user has all of the required permissions", () => {
            const { queryByText } = renderRoute(true, { secure: true, permissions: ["admin.read", "admin.write"], requireAllPermissions: true }, { permissions: ["admin.read", "admin.write"] });
            expect(queryByText("Home")).toBeInTheDocument();
        });
        it("should not render route if the user does not have all of the required permissions (global requireAllPermissions)", () => {
            const { queryByText } = renderRoute(true, { secure: true, permissions: ["admin.read", "admin.write"] }, { permissions: ["admin.read"], requireAllPermissions: true });
            expect(queryByText("Home")).not.toBeInTheDocument();
        });
        it("should render route if the user has all of the required permissions (global requireAllPermissions)", () => {
            const { queryByText } = renderRoute(true, { secure: true, permissions: ["admin.read", "admin.write"] }, { permissions: ["admin.read", "admin.write"], requireAllPermissions: true });
            expect(queryByText("Home")).toBeInTheDocument();
        });
        it("should render the fallback component if the user does not have the correct permissions", () => {
            const { queryByText } = renderRoute(true, { secure: true, permissions: ["admin.read", "admin.write"], fallbackPermissionsComponent: () => <div>Fallback</div> }, { permissions: ["admin.read"], requireAllPermissions: true });
            expect(queryByText("Fallback")).toBeInTheDocument();
        });
        it("should render the global fallback component if the user does not have the correct permissions", () => {
            const { queryByText } = renderRoute(true, { secure: true, permissions: ["admin.read", "admin.write"] }, { permissions: ["admin.read"], requireAllPermissions: true, FallbackPermissionsComponent: () => <div>Fallback</div> });
            expect(queryByText("Fallback")).toBeInTheDocument();
        });
    });

    describe("roles", () => {
        it("should not render route if the user does not have at least 1 of the required roles", () => {
            const { queryByText } = renderRoute(true, { secure: true, roles: ["Admin"]});
            expect(queryByText("Home")).not.toBeInTheDocument();
        });
        it("should render route if the user does has at least 1 of the required roles", () => {
            const { queryByText } = renderRoute(true, { secure: true, roles: ["Admin"]}, { roles: ["Admin", "Dev"] });
            expect(queryByText("Home")).toBeInTheDocument();
        });
        it("should not render route if the user does not have all of the required roles", () => {
            const { queryByText } = renderRoute(true, { secure: true, roles: ["Admin", "Dev"], requireAllRoles: true }, { roles: ["Admin"]});
            expect(queryByText("Home")).not.toBeInTheDocument();
        });
        it("should render route if the user has all of the required roles", () => {
            const { queryByText } = renderRoute(true, { secure: true, roles: ["Admin", "Dev"], requireAllRoles: true }, { roles: ["Admin", "Dev"] });
            expect(queryByText("Home")).toBeInTheDocument();
        });
        it("should not render route if the user does not have all of the required roles (global requireRoles)", () => {
            const { queryByText } = renderRoute(true, { secure: true, roles: ["Admin", "Dev"] }, { roles: ["Admin"], requireAllRoles: true });
            expect(queryByText("Home")).not.toBeInTheDocument();
        });
        it("should render route if the user has all of the required roles (global requireRoles)", () => {
            const { queryByText } = renderRoute(true, { secure: true, roles: ["Admin", "Dev"] }, { roles: ["Admin", "Dev"], requireAllRoles: true  });
            expect(queryByText("Home")).toBeInTheDocument();
        });
        it("should render the fallback component is the user does not have the correct roles", () => {
            const { queryByText } = renderRoute(true, { secure: true, roles: ["Admin", "Dev"], fallbackRolesComponent: () => <div>Invalid</div> }, { roles: ["Admin"], requireAllRoles: true  });
            expect(queryByText("Invalid")).toBeInTheDocument();
        });
        it("should render the global fallback component is the user does not have the correct roles", () => {
            const { queryByText } = renderRoute(true, { secure: true, roles: ["Admin", "Dev"] }, { roles: ["Admin"], requireAllRoles: true, FallbackRolesComponent: () => <div>Invalid</div>  });
            expect(queryByText("Invalid")).toBeInTheDocument();
        });
    });
    
});
  
function renderRoute(authenticated: boolean, homepageRoutesProps?: Partial<RouteConfig>, testAppWrapperProps?: Partial<TestAppWrapperProps>) {
    const testAppProps = {
        authenticated,
        initialA11yMessage: "",
        initialDocumentTitle: "",
        initialEntries: ["/"],
        initialIndex: 0,
        routes: createRoutes(homepageRoutesProps),
        ...(testAppWrapperProps || {})
    };
    const result = renderTestApp(testAppProps);
    return result;
}
