import React from 'react';
import { render, RenderResult, act } from "@testing-library/react";
import createTestAppWrapper, { TestAppWrapperProps } from '../createTestAppWrapper';

async function renderTestApp(wrapperProps: TestAppWrapperProps) {

    let result: RenderResult = {} as RenderResult;

    await act(async () => {
        result = render(createTestAppWrapper(wrapperProps));
    });

    return result;
}

export default renderTestApp;