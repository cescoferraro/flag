import getMuiTheme from "material-ui/styles/getMuiTheme";


export const cyan500 = '#00bcd4';
export const MyTheme = (userAgent) => {
    const muiTheme = getMuiTheme({
        palette: {
            primary1Color: "#008000",
            textColor: "#684E48",
        },
        appBar: {
            height: 50,
        },
    });
    return getMuiTheme(muiTheme, {userAgent: userAgent});
};
