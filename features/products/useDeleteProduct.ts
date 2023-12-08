import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useDeleteProduct({onSuccess}: {onSuccess: () => void}) {
    return useMutation({
        mutationKey: ['deleteProduct'],
        mutationFn: async (id_product: number) => {
            try {
                const responseProduct = await axios.delete(`/api/products/${id_product}`);
                return responseProduct;
            } catch (error) {
                const e = error as AxiosError;
                console.log(e);
                throw new Error(e.message);
            }
        },
        onSuccess
    })
}