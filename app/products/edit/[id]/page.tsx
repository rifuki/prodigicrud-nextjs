'use client';

import useFetchProduct from "@/features/products/useFetchProduct"
import useUpdateProduct from "@/features/products/useUpdateProduct";
import { FormikPayload } from "@/types/user";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect } from "react";
import * as yup from 'yup';

const initialFormikValues: FormikPayload = {
        name: '',
        qty: 0,
        price: 0,
        description: ''
};

export default function EditProduct({params}: {params: { id: number }}) {
    const router = useRouter();

    const { data: fetchProduct } = useFetchProduct({id_product: params.id});
    const { mutate: updateProduct } = useUpdateProduct({onSuccess: () => router.push('/products')});

    const formik = useFormik<FormikPayload>({
        initialValues: initialFormikValues,
        onSubmit: values => {
            const convertedValues = {
                ...values,
                qty: parseInt(values.qty.toString(), 10),
                price: parseFloat(values.price.toString())
            }
            updateProduct({
                id_product: params.id,
                body: convertedValues
            });
        },
        validationSchema: yup.object().shape({
            name: yup.string().required().min(3).max(20),
            qty: yup.number().required().positive().max(2147483647),
            price: yup.number().required().positive().max(100000),
            description: yup.string().optional().min(3)
        })
    })

    function handleFormInput(event: ChangeEvent<HTMLInputElement>) {
        formik.setFieldValue(event.target.name, event.target.value);
    }

    useEffect(() => {
        if(fetchProduct) {
            formik.setValues({
                name: fetchProduct.name,
                qty: fetchProduct.qty,
                price: fetchProduct.price,
                description: fetchProduct.description
            })
        }
    }, [fetchProduct]);

    return( 
        <div className="min-h-screen flex justify-items-center items-center">
            <div className="w-full max-w-sm mx-auto">
                <form onSubmit={formik.handleSubmit} className="bg-gray-800 rounded-md p-5">
                    <div className="mb-2">
                        <label htmlFor="name" className="mb-2 text-sm font-medium dark:text-white">Product Name</label>
                        <input onChange={handleFormInput} value={formik.values.name} name="name" type="text" id="name" className="p-2.5 text-sm w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product Name" />
                        <p className="text-red-500 text-xs font-medium my-1">{formik.errors?.name ? formik.errors?.name : null}</p>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="qty" className="mb-2 text-sm font-medium dark:text-white">Quantity</label>
                        <input onChange={handleFormInput} value={formik.values.qty} name="qty" type="text" id="qty" className="p-2.5 text-sm w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Product Quantity" />
                        <p className="text-red-500 text-sm font-medium my-1">{formik.errors?.qty ? formik.errors?.qty : null}</p>

                    </div>

                    <div className="mb-2">
                        <label htmlFor="price" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            </span>
                            <input onChange={handleFormInput} value={formik.values.price} name="price" type="text" id="price" className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Product Price" />
                        </div>
                        <p className="text-red-500 text-xs font-medium my-1">{formik.errors?.price ? formik.errors?.price : null}</p>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="description" className="mb-2 text-sm font-medium dark:text-white">Quantity</label>
                        <input onChange={handleFormInput} value={formik.values.description} name="description" type="text" id="description" className="p-6 text-sm w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Product Description" />
                        <p className="text-red-500 text-xs font-medium my-1">{formik.errors?.description ? formik.errors?.description : null}</p>

                    </div>

                    <div className="mt-5 flex justify-between items-center">
                        <Link href={'/products'} className="font-medium tracking-wider">⬅️ Back</Link>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 px-4 py-2.5 text-center dark:focus:ring-blue-800 rounded-lg text-sm font-medium focus:outline-none focus:ring-2">Update Product</button>
                    </div>
                </form>
            </div>
        </div>
    )
}