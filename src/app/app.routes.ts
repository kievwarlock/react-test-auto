export enum RegisterPages {
    SEARCH = "Search",
}

export type AppRouteType = {
    url: string;
};

export type AppRoutesType = {
    [key in keyof typeof RegisterPages]: AppRouteType
};

export const APP_ROUTES: AppRoutesType = {
    SEARCH: {
        url: "/:value1?/:value2?/:value3?"
    },
};