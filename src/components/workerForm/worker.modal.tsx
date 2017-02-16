import * as React from "react";
import {connect, PromiseState} from "react-refetch";
import {connect as REDUX} from "react-redux";
import "react-table/react-table.css";
import {TOOGLE_EDIT_MODAL} from "../../actions/app";
import {reduxForm, Field} from "redux-form";
import {DatePicker, SelectField, TextField} from "redux-form-material-ui";
import * as Modal from "react-modal";
import {FORMCESCO} from "./worker.form";
import {AppActions} from "../../actions/index";

export const EditModal =
    REDUX((state) => ({
        app: state.app
    }), AppActions)(
        ({app, TOOGLE_EDIT_MODAL, refreshSheet}) => {

            return <Modal
                style={modalstyle}
                isOpen={app.editModal}
                contentLabel="Example Modal">
                <button onClick={TOOGLE_EDIT_MODAL.bind(this)}>
                    close
                </button>
                <FORMCESCO refreshSheet={refreshSheet} kind={"update"}/>
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
