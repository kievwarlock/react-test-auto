import * as React from "react"
import {Layout} from "./layout.component";
import {BrowserRouter} from "react-router-dom";

export const App: React.FC = () => (
    <BrowserRouter>
        <Layout/>
    </BrowserRouter>
);