import * as React from "react";
import * as hoistStatics from "hoist-non-react-statics";


export const BellowAppShell = () => {
    return (ComposedComponent) => {
        class WithStyles extends React.Component<any,any> {
            render() {
                return <div style={{height:"calc( 100vh - 64px)",marginTop:"64px"}}>
                    <ComposedComponent {...this.props} />
                </div>;
            }
        }
        return hoistStatics(WithStyles, ComposedComponent);

    };
};
