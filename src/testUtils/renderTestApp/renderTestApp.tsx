import { render, RenderResult, act } from '@testing-library/react';
import createTestAppWrapper, {
    TestAppWrapperProps,
} from '../createTestAppWrapper';

async function renderTestApp(
    wrapperProps: TestAppWrapperProps
): Promise<RenderResult> {
    let result: RenderResult = {} as RenderResult;

    await act(async () => {
        result = render(createTestAppWrapper(wrapperProps));
    });

    return result;
}

export default renderTestApp;
