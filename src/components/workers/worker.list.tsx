import * as React from "react";
import { connect, PromiseState } from "react-refetch";
import Utils from "../../shared/utils";

class ListComponent extends React.Component<any, any> {
    render() {
        const { sheet } = this.props
        if (sheet.pending) {
            return <h2>loaidng</h2>
        } else if (sheet.rejected) {
            return <h2>error</h2>
        } else if (sheet.fulfilled) {
            return <div>
                {sheet.value.map(worker => {
                    return <h2 key={Math.random()} >{worker.Name}</h2>
                })}
            </div>
        }
    }

};


export const List = connect(props => ({
    sheet: Utils.API_URL("/sheet")
}))(ListComponent);
