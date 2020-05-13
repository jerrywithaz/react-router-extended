import styled from 'styled-components';

export const ScreenReaderOnly = styled.div`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0px;
`;