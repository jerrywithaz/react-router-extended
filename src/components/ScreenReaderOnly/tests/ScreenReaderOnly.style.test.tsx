import { renderScreenReaderOnly } from './ScreenReaderOnly.testUtils';

describe("<ScreenReaderOnly/> (Styles)", () => {
    it("has position: absolute", () => {
        const { root } = renderScreenReaderOnly({});
        expect(root).toHaveStyleRule("position", "absolute");
    });
    it("should have width of 1px", () => {
        const { root } = renderScreenReaderOnly({});
        expect(root).toHaveStyleRule("width", "1px");
    });
    it("should have height of 1px", () => {
        const { root } = renderScreenReaderOnly({});
        expect(root).toHaveStyleRule("height", "1px");
    });
    it("should have padding of 0px", () => {
        const { root } = renderScreenReaderOnly({});
        expect(root).toHaveStyleRule("padding", "0px");
    });
    it("should have margin of -1px", () => {
        const { root } = renderScreenReaderOnly({});
        expect(root).toHaveStyleRule("margin", "-1px");
    });
    it("should have hidden overflow", () => {
        const { root } = renderScreenReaderOnly({});
        expect(root).toHaveStyleRule("overflow", "hidden");
    });
    it("should have clip with 0 dimension rect", () => {
        const { root } = renderScreenReaderOnly({});
        expect(root).toHaveStyleRule("clip", "rect(0,0,0,0)");
    });
    it("should have border of 0px", () => {
        const { root } = renderScreenReaderOnly({});
        expect(root).toHaveStyleRule("border", "0px");
    });
});
