import * as React from "react";
import {Switch, Route, useLocation} from "react-router-dom";
import {SearchPage} from "@/app/page/search-page.component";
import {APP_ROUTES} from "@/app/app.routes";

export const Layout: React.FC = () => {
    const location = useLocation();

    return (
        <div className="layout">
            <Switch location={location}>
                <Route
                    exact
                    component={SearchPage}
                    path={APP_ROUTES.SEARCH.url}
                />
            </Switch>
        </div>
    );
};