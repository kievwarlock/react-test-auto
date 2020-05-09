import {ApiService} from "@/shared/services/api.service";

export const BrandService = {
    async getBrands() {
        return await ApiService.get("search/brands_terms");
    }
};