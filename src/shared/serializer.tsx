declare let require: any;
export const Serialize = (object) => {
    return require('serialize-javascript')(object)
};
