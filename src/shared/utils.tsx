import * as React from "react";


let Utils = {
    isServer: () => !(typeof window !== "undefined" && window.document),
    API_URL: (path) => {
        if (document.location.hostname === "flag.cescoferraro.xyz") {
            return "http://api.flag.cescoferraro.xyz" + path;
        }
        return "http://" +
            window.location.hostname + ":7070" + path;
    }
};


export default Utils;



