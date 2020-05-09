import * as React from "react";

export interface CommonProps {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
}

export interface ChildrenProps<T extends any | any[] = React.ReactNode> {
    children?: T extends (infer U)[] ? U | U[] : T;
}