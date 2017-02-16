type APP_OBJECT = {
    version?: string;
    component?: JSX.Element;
    selectedTab?: Number;
    insertProgress?: Number;
    progress?: Number;
    loginProgress?: Number;
    editModal?: boolean;
    editing?: FlagWorker;

}

interface AppReducers {
    app: APP_OBJECT
}
