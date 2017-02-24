type  ProgressBar = {
    loading: boolean;
    progress: number;
}

type APP_OBJECT = {
    version?: string;
    component?: JSX.Element;
    selectedTab?: Number;
    loginProgress?: Number;
    editModal?: boolean;
    editing?: FlagWorker;
    progressBar?: ProgressBar

}

interface AppReducers {
    app: APP_OBJECT
}
