import * as ReactReveal from 'react-reveal';

export type Okay = {};

declare module "react-reveal" {
    
    export type TReactReveal = any;

    const ReactReveal: TReactReveal = {};

    export { TReactReveal };
    export default ReactReveal;

}