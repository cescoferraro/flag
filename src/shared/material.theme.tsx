import getMuiTheme from "material-ui/styles/getMuiTheme";

const muiTheme = {
    palette: {
        primary1Color: "#0f9d58",
        textColor: "#684E48",
    },
    appBar: {
        height: 64,
    },
};

export const MyTheme = (userAgent) => {
    return getMuiTheme(muiTheme, {userAgent: userAgent});
};
