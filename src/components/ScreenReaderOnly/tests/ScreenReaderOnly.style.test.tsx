import { renderScreenReaderOnly } from './ScreenReaderOnly.testUtils';

describe("<ScreenReaderOnly/> (Styles)", () => {
    it("has position: absolute", () => {
        const { styles } = renderScreenReaderOnly({});
        expect(styles).toHaveProperty("position", "absolute");
    });
    it("should have width of 1px", () => {
        const { styles } = renderScreenReaderOnly({});
        expect(styles).toHaveProperty("width", "1px");
    });
    it("should have height of 1px", () => {
        const { styles } = renderScreenReaderOnly({});
        expect(styles).toHaveProperty("height", "1px");
    });
    it("should have padding of 0px", () => {
        const { styles } = renderScreenReaderOnly({});
        expect(styles).toHaveProperty("padding", "0px");
    });
    it("should have margin of -1px", () => {
        const { styles } = renderScreenReaderOnly({});
        expect(styles).toHaveProperty("margin", "-1px");
    });
    it("should have hidden overflow", () => {
        const { styles } = renderScreenReaderOnly({});
        expect(styles).toHaveProperty("overflow", "hidden");
    });
    it("should have clip with 0 dimension rect", () => {
        const { styles } = renderScreenReaderOnly({});
        expect(styles).toHaveProperty("clip", "rect(0px, 0px, 0px, 0px)");
    });
    it("should have border of 0px", () => {
        const { styles } = renderScreenReaderOnly({});
        expect(styles).toHaveProperty("border", "0px");
    });
});
