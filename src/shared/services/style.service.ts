import {ApiService} from "@/shared/services/api.service";

export const StyleService = {
    async getStyles() {
        return await ApiService.get("search/styles");
    }
};