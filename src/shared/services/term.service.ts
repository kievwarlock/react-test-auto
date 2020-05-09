import {ApiService} from "@/shared/services/api.service";

export const TermService = {
    async getTerms() {
        return await ApiService.get("search/terms");
    }
};