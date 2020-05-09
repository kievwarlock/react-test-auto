import "./page-loader.component.scss";
import {CommonProps, ChildrenProps} from "@/shared/types/types";
import {classes} from "@/shared/utils/utils";
import * as React from "react";

export type PageLoaderType = CommonProps & ChildrenProps;

export const PageLoader: React.FC<PageLoaderType> = ({...props}) => {
    const classNames = classes("page-loader", props.className);

    return (
        <div
            id={props.id}
            style={props.style}
            className={classNames}>
            <div className="page-loader__spinner"/>
        </div>
    )
};

