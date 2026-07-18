import axiosInstance from "./axiosInstance";

export const searchImages = async (query, albumId) => {
    const params = { query };
    if (albumId) params.albumId = albumId;

    const response = await axiosInstance.get("/image/search", { params });
    return response.data.images;
};