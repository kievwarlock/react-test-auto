import "./select.component.scss"
import * as React from "react";
import {CommonProps} from "@/shared/types/types";
import {classes} from "@/shared/utils/utils";

export type SelectValue = {
    id: string | number;
    text: string | number;
    value: string | number;
}

export type SelectType = CommonProps & {
    value?: SelectValue[];
    selected?: string;
    emptyOptionName?: string;
    onChange?: (newValue: string) => void;
}

export const Select: React.FC<SelectType> = (
    {
        value,
        selected,
        onChange,
        emptyOptionName = "Please select...",
        ...CommonProps
    }) => {
    const classNames = classes("select", CommonProps.className);

    return (
        <select
            className={classNames}
            value={selected}
            onChange={(e) => onChange(e.target.value)}
        >
            <option key="empty_value" value="">{emptyOptionName}</option>
            {value &&
                value.map(item => <option key={item.id} value={item.value}>{item.text}</option>)
            }
        </select>
    )
};
