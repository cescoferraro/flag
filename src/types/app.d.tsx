type APP_OBJECT = {
    version?: string;
    component?: JSX.Element;
    selectedTab?:Number;
}

interface AppReducers {
    app: APP_OBJECT
}
