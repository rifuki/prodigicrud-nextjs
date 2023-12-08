import axios from '@/lib/axios';
import { FormikPayload } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function useCreateProduct({onSuccess}:{onSuccess: () => void}) {
    return useMutation({
        mutationKey: ['createProduct'],
        mutationFn: async (body: FormikPayload) => {
            try {
                const { data } = await axios.post('/api/products', body);
                return data;
            } catch (error) {
                const e = error as AxiosError;
                console.log(e);
                throw new Error(e.message);
            }
        },
        onSuccess
    })
}