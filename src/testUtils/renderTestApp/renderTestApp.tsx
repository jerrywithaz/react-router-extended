import React from 'react';
import { render, RenderResult, act } from "@testing-library/react";
import createTestAppWrapper, { TestAppWrapperProps } from '../createTestAppWrapper';

function renderTestApp(wrapperProps: TestAppWrapperProps) {

    let result: RenderResult = {} as RenderResult;

    act(() => {
        result = render(createTestAppWrapper(wrapperProps));
    });

    return result;
}

export default renderTestApp;