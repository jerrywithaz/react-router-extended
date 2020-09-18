import React from "react";
import renderTestApp from "./../../../testUtils/renderTestApp";
import createRoutes from "../../../testUtils/createTestRoutes";
import { RouteConfig } from "../../../types";
import { TestAppWrapperProps } from "../../../testUtils/createTestAppWrapper";
import { getByText } from "@testing-library/dom";

describe("<Route/>", () => {
  describe("accessibility", () => {
    it("should set the document title when the component renders", async () => {
      await renderRoute(false, { secure: false });
      expect(document.title).toBe("Home");
    });
    it("should display a11y message when component is rendered", async () => {
      const { queryByText } = await renderRoute(false, { secure: false });
      expect(
        queryByText("You have navigated to the Home Page")
      ).toBeInTheDocument();
    });
  });

  describe("authentication", () => {
    it("should render non-secure route without error", async () => {
      const { getByText } = await renderRoute(false, { secure: false });
      expect(getByText("Home")).toBeInTheDocument();
    });
    it("should render secure route if application is authenticated", async () => {
      const { getByText } = await renderRoute(true, { secure: true });
      expect(getByText("Admin")).toBeInTheDocument();
    });
    it("should not render secure route if application is not authenticated", async () => {
      const { queryByText, getByText } = await renderRoute(false, { secure: true });
      expect(queryByText("Home")).not.toBeInTheDocument();
      expect(getByText("Login")).toBeInTheDocument();
    });
  });

  describe("permissions", () => {
    it("should not render route if the user does not have at least 1 of the required permissions", async () => {
      const { queryByText } = await renderRoute(true, {
        secure: true,
        permissions: ["admin.read"],
      });
      expect(queryByText("Home")).not.toBeInTheDocument();
    });
    it("should render route if the user has at least 1 of the required permissions", async () => {
      const { queryByText } = await renderRoute(
        true,
        { secure: true, permissions: ["admin.read"] },
        { permissions: ["admin.read", "admin.write"] }
      );
      expect(queryByText("Admin")).toBeInTheDocument();
    });
    it("should not render route if the user does not have all of the required permissions", async () => {
      const { queryByText, getByText } = await renderRoute(
        true,
        {
          secure: true,
          permissions: ["admin.read", "admin.write"],
          requireAllPermissions: true,
        },
        { permissions: ["admin.read"] }
      );
      expect(queryByText("Admin")).not.toBeInTheDocument();
      expect(getByText("Invalid permissions")).toBeInTheDocument();
    });
    it("should render route if the user has all of the required permissions", async () => {
      const { queryByText } = await renderRoute(
        true,
        {
          secure: true,
          permissions: ["admin.read", "admin.write"],
          requireAllPermissions: true,
        },
        { permissions: ["admin.read", "admin.write"] }
      );
      expect(queryByText("Admin")).toBeInTheDocument();
    });
    it("should not render route if the user does not have all of the required permissions (global requireAllPermissions)", async () => {
      const { queryByText } = await renderRoute(
        true,
        { secure: true, permissions: ["admin.read", "admin.write"] },
        { permissions: ["admin.read"], requireAllPermissions: true }
      );
      expect(queryByText("Home")).not.toBeInTheDocument();
    });
    it("should render route if the user has all of the required permissions (global requireAllPermissions)", async () => {
      const { queryByText } = await renderRoute(
        true,
        { secure: true, permissions: ["admin.read", "admin.write"] },
        {
          permissions: ["admin.read", "admin.write"],
          requireAllPermissions: true,
        }
      );
      expect(queryByText("Admin")).toBeInTheDocument();
    });
    it("should render the fallback component if the user does not have the correct permissions", async () => {
      const { queryByText } = await renderRoute(
        true,
        {
          secure: true,
          permissions: ["admin.read", "admin.write"],
          fallbackPermissionsComponent: () => <div>Fallback</div>,
        },
        { permissions: ["admin.read"], requireAllPermissions: true }
      );
      expect(queryByText("Fallback")).toBeInTheDocument();
    });
    it("should render the global fallback component if the user does not have the correct permissions", async () => {
      const { queryByText } = await renderRoute(
        true,
        { secure: true, permissions: ["admin.read", "admin.write"] },
        {
          permissions: ["admin.read"],
          requireAllPermissions: true,
          FallbackPermissionsComponent: () => <div>Fallback</div>,
        }
      );
      expect(queryByText("Fallback")).toBeInTheDocument();
    });
    it("should render the default component if the user does not have the correct permissions", async () => {
      const { queryByText } = await renderRoute(
        true,
        {
          secure: true,
          permissions: ["admin.read", "admin.write"],
          useComponentAsFallback: true,
          component: ({ insufficientPermissions }) =>
            insufficientPermissions ? <div>Invalid</div> : <div>Home</div>,
        },
        { permissions: ["admin.read"], requireAllPermissions: true }
      );
      expect(queryByText("Invalid")).toBeInTheDocument();
    });
  });

  describe("roles", () => {
    it("should not render route if the user does not have at least 1 of the required roles", async () => {
      const { queryByText, getByText } = await renderRoute(true, {
        secure: true,
        roles: ["Admin"],
      });
      expect(queryByText("Home")).not.toBeInTheDocument();
      expect(getByText("Invalid roles")).toBeInTheDocument();
    });
    it("should render route if the user does has at least 1 of the required roles", async () => {
      const { queryByText } = await renderRoute(
        true,
        { secure: true, roles: ["Admin"] },
        { roles: ["Admin", "Dev"] }
      );
      expect(queryByText("Admin")).toBeInTheDocument();
    });
    it("should not render route if the user does not have all of the required roles", async () => {
      const { queryByText, getByText } = await renderRoute(
        true,
        { secure: true, roles: ["Admin", "Dev"], requireAllRoles: true },
        { roles: ["Admin"] }
      );
      expect(queryByText("Admin")).not.toBeInTheDocument();
      expect(getByText("Invalid roles")).toBeInTheDocument();
    });
    it("should render route if the user has all of the required roles", async () => {
      const { queryByText } = await renderRoute(
        true,
        { secure: true, roles: ["Admin", "Dev"], requireAllRoles: true },
        { roles: ["Admin", "Dev"] }
      );
      expect(queryByText("Admin")).toBeInTheDocument();
    });
    it("should not render route if the user does not have all of the required roles (global requireRoles)", async () => {
      const { queryByText, getByText } = await renderRoute(
        true,
        { secure: true, roles: ["Admin", "Dev"] },
        { roles: ["Admin"], requireAllRoles: true }
      );
      expect(queryByText("Admin")).not.toBeInTheDocument();
      expect(getByText("Invalid roles")).toBeInTheDocument();
    });
    it("should render route if the user has all of the required roles (global requireRoles)", async () => {
      const { queryByText } = await renderRoute(
        true,
        { secure: true, roles: ["Admin", "Dev"] },
        { roles: ["Admin", "Dev"], requireAllRoles: true }
      );
      expect(queryByText("Admin")).toBeInTheDocument();
    });
    it("should render the fallback component is the user does not have the correct roles", async () => {
      const { queryByText } = await renderRoute(
        true,
        {
          secure: true,
          roles: ["Admin", "Dev"],
          fallbackRolesComponent: () => <div>Invalid</div>,
        },
        { roles: ["Admin"], requireAllRoles: true }
      );
      expect(queryByText("Invalid")).toBeInTheDocument();
    });
    it("should render the global fallback component is the user does not have the correct roles", async () => {
      const { queryByText } = await renderRoute(
        true,
        { secure: true, roles: ["Admin", "Dev"] },
        {
          roles: ["Admin"],
          requireAllRoles: true,
          FallbackRolesComponent: () => <div>Invalid</div>,
        }
      );
      expect(queryByText("Invalid")).toBeInTheDocument();
    });
    it("should render the default component if the user does not have the correct roles", async () => {
      const { queryByText } = await renderRoute(
        true,
        {
          secure: true,
          roles: ["Admin", "Dev"],
          useComponentAsFallback: true,
          component: ({ insufficientRoles }) =>
            insufficientRoles ? <div>Invalid</div> : <div>Home</div>,
        },
        {
          roles: ["Admin"],
          requireAllRoles: true,
        }
      );
      expect(queryByText("Invalid")).toBeInTheDocument();
    });
  });
});

async function renderRoute(
  authenticated: boolean,
  homepageRoutesProps?: Partial<RouteConfig>,
  testAppWrapperProps?: Partial<TestAppWrapperProps>
) {
  const testAppProps = {
    authenticated,
    initialA11yMessage: "",
    initialDocumentTitle: "",
    initialEntries: ["/"],
    initialIndex: 0,
    routes: createRoutes(homepageRoutesProps),
    redirectPathAfterLogin: "/admin",
    ...(testAppWrapperProps || {}),
  };
  const result = await renderTestApp(testAppProps);
  return result;
}
