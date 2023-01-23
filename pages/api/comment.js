import axios from "axios";

import { API_URL } from "../../lib/constants";

const CommentAPI = {
    create: async (slug, comment) => {
        try {
            const response = await axios.post(
                `${API_URL}/articles/${slug}/comments`,
                JSON.stringify({ comment })
            );
            return response;
        } catch (error) {
            return error.response;
        }
    },
    delete: async (slug, commentId) => {
        try {
            const response = await axios.delete(
                `${API_URL}/articles/${slug}/comments/${commentId}`
            );
            return response;
        } catch (error) {
            return error.response;
        }
    },

    forArticle: (slug) =>
        axios.get(`${API_URL}/articles/${slug}/comments`),
};

export default CommentAPI;
