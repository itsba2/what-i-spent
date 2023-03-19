// library imports
import { createApi } from "@reduxjs/toolkit/query/react"
import axios from "axios"

const axiosQuery =
    ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method, data, params }) => {
        try {
            const result = await axios({
                method,
                baseURL: baseUrl,
                url,
                data,
                params,
            })
            return { data: result.data }
        } catch (error) {
            let err = error
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }

export const api = createApi({
    reducerPath: "api",
    baseQuery: axiosQuery({
        baseUrl: "http://localhost:3131",
    }),
    tagTypes: [],
    endpoints: () => ({}),
})
