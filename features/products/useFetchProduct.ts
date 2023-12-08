'use client';

import axios from "@/lib/axios";
import { Product } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useFetchProduct({id_product}: {id_product: number}) {
    return useQuery({
        queryFn: async () => {
            try {
                const { data } = await axios.get<Product>(`/api/products/${id_product}`);
                return data;
            } catch (error) {
                const e = error as AxiosError;
                console.log(e);
                throw new Error(e.message);
            }
        },
        queryKey: ['getProduct']
    })
}