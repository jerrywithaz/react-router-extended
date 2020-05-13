import { renderScreenReaderOnly } from './ScreenReaderOnly.testUtils';

describe("<ScreenReaderOnly/>", () => {
    it("should render without error", () => {
        const { root } = renderScreenReaderOnly({});
        expect(root).toBeInTheDocument();
    });
});
