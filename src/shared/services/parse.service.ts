import {ApiService} from "@/shared/services/api.service";

export type ParseLinkType = {
    style?: string;
    brand?: string;
    service?: string;
}

export const ParseService = {
    async parseLink({style, brand, service}: ParseLinkType) {
        const paramData = [
            {
                key: "style_slug",
                value: style,
            },
            {
                key: "brand_slug",
                value: brand,
            },
            {
                key: "service_slug",
                value: service,
            }
        ];

        const urlParams = paramData.reduce((acc, {value, key}) => {
            if (value && !acc) {
                return `?${key}=${value}`;
            }
            return value ? `${acc}&${key}=${value}` : acc;
        }, "");

        return await ApiService.get(`search/parse_link${urlParams}`);
    }
};