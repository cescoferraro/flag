import * as React from "react";
import {connect as REDUX} from "react-redux";
import {AppActions} from "../../redux/actions";
import * as Modal from "react-modal";
import {FORMCESCO} from "./worker.form";
import RaisedButton from "material-ui/RaisedButton";


export const EditModal =
    REDUX((state) => ({
        app: state.app
    }), AppActions)(
        ({app, EDIT_MODAL_STATE, refreshSheet}) => {

            return <Modal
                style={modalstyle}
                isOpen={app.editModal}
                contentLabel="Example Modal">

                <FORMCESCO refreshSheet={refreshSheet} kind={"update"}/>
                <RaisedButton
                    fullWidth={true}
                    primary={true}
                    onClick={EDIT_MODAL_STATE.bind(this,false)}
                >close</RaisedButton>
            </Modal>
        });


let modalstyle = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.85)'
    },
    content: {
        position: 'relative',
        top: '0px',
        right: '0px',
        left: '0px',
        height: "calc(100vh - 155px)",
        marginTop: "64px",
        bottom: '0px',
        zIndex: "22",
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px'

    }
};
