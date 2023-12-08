import axios from "@/lib/axios";
import { FormikPayload } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useUpdateProduct({onSuccess}: {onSuccess: () => void}) {
    return useMutation({
        mutationKey: ['update.product'],
        mutationFn: async ({id_product, body}: {id_product: number, body: FormikPayload}) => {
            try {
                const { data } = await axios.put(`/api/products/${id_product}`, body);
                return data;
            } catch (error) {
                const e = error as AxiosError;
                console.log(e.message);
                throw new Error(e.message);
            }
        },
        onSuccess
    })
}