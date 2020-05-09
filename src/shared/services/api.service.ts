import {API_ENDPOINT} from "@/shared/services/api.config";

export const ApiService = {
    async get(slug: string) {
        const response = await fetch(`${API_ENDPOINT}/${slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`ApiService failed, HTTP status ${response.status}`);
        }

        return await response.json();
    }
};