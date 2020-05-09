import {SelectValue} from "@/shared/components/form/select.component";
import {TermsType} from "@/shared/services/model.type";

export const formatDataToSelect = (data: TermsType[]): SelectValue[] => (
    data.map((item) => (
        {
            id: item.id,
            text: item.label,
            value: item.slug,
        }
    ))
);