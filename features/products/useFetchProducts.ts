'use client';

import axios from "@/lib/axios";
import { Product } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useFetchProducts() {
    return useQuery({
        queryFn: async () => {
            try {
                const { data } = await axios.get<Product[]>('/api/products')
                return data;
            } catch (error) {
                const e = error as AxiosError;
                throw new Error(e.message);
            }
        },
        queryKey: ['products']
    })
}