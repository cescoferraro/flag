import * as React from "react";
import * as hoistStatics from "hoist-non-react-statics";
import * as debug from "debug";

export const Debug = () => {
    return (ComposedComponent) => {

        class WithDebugger extends React.Component<any,any> {
            render() {
                return  <ComposedComponent
                    console={debug(ComposedComponent.name)}
                    {...this.props} />;
            }
        }
        return hoistStatics(WithDebugger, ComposedComponent);

    };
};
