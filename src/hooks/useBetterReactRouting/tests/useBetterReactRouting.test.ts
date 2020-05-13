import { renderHook } from '@testing-library/react-hooks';
import useBetterReactRouting from '../useBetterReactRouting';
import createTestAppWrapper from '../../../testUtils/createTestAppWrapper';

describe("Hooks - useBetterReactRouting", () => {
    it("should throw an error if hook is not used inside of a <BetterReactRoutingProvider/>", () => {
        expect(() => useBetterReactRouting()).toThrowError();
    });
    it("should return context value from <BetterReactRoutingProvider/>", () => {
        const { result } = renderUseBetterReactRoutingHook(true);
        expect(result.current.authenticated).toEqual(true);
        expect(result.current.pageNotFoundA11yMessage).toEqual("Page Not Found");
        expect(result.current.pageNotFoundDocumentTitle).toEqual("Login");
        expect(result.current.redirectPath).toEqual("/login");
        expect(result.current.setA11yMessage).toBeInstanceOf(Function);
        expect(result.current.setDocumentTitle).toBeInstanceOf(Function);
    });
});

function renderUseBetterReactRoutingHook(authenticated: boolean) {

    const result = renderHook(() => useBetterReactRouting(), {
        wrapper: ({ children }) => createTestAppWrapper({
            authenticated,
            initialDocumentTitle: "",
            initialA11yMessage: "",
            pageNotFoundA11yMessage: "Page Not Found",
            pageNotFoundDocumentTitle: "Login",
            redirectPath: "/login"
        }, children)
    });
    
    return result;

}