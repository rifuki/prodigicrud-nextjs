'use client';

import Link from "next/link";
import { useFormik } from "formik";
import { FormikPayload } from "@/types/user";
import { ChangeEvent } from "react";
import useCreateProduct from "@/features/products/useCreateProduct";
import { useRouter } from "next/navigation";
import * as yup from 'yup';

export default function ProductsAdd() {
    const router = useRouter();
    const { mutate } = useCreateProduct({
        onSuccess: () => router.push('/products')
    });

    const intialFormikValues: FormikPayload = {
        name: '',
        qty: 0,
        price: 0,
        description: '' 
    };

    const formik = useFormik<FormikPayload>({
        initialValues: intialFormikValues,
        onSubmit: values => {
            const convertedValues = {
                ...values,
                qty: parseInt(values.qty.toString(), 10),
                price: parseFloat(parseFloat(values.price.toString()).toFixed(2))
            }

            mutate(convertedValues)
        },
        validationSchema: yup.object().shape({
            name: yup.string().required().min(3).max(20),
            qty: yup.number().required().positive().max(100),
            price: yup.number().required().positive(),
            description: yup.string().optional().min(10)
        })
    })

    function handleFormInput(event: ChangeEvent<HTMLInputElement>) {
        formik.setFieldValue(event.target.name, event.target.value);
    }

    return (
        <div className="min-h-screen flex justify-items-center items-center">
            <div className="w-full max-w-xs mx-auto">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="name">Product Name</label>
                        <input onChange={handleFormInput} value={formik.values.name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inner" type="text" placeholder="Enter Product Name" id="name" name="name" />
                        <p className="text-red-500 text-sm font-medium">{formik.errors?.name ? formik.errors?.name : null}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="qty">Qty</label>
                        <input onChange={handleFormInput} value={formik.values.qty} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inner" type="number" placeholder="Enter Quantity" id="qty" name="qty" />
                        <p className="text-red-500 text-sm font-medium">{formik.errors?.qty ? formik.errors?.qty : null}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="price">Price</label>
                        <input onChange={handleFormInput} value={formik.values.price} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inner" type="number" placeholder="Enter Price" id="price" name="price" />
                        <p className="text-red-500 text-sm font-medium">{formik.errors?.price ? formik.errors?.price : null}</p>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="description">Description</label>
                        <input onChange={handleFormInput} value={formik.values.description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inner" type="text" placeholder="Enter Description" id="description" name="description" />
                        <p className="text-red-500 text-sm font-medium">{formik.errors?.description ? formik.errors?.description : null}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <Link href={"/products"} className="text-gray-700 font-normal hover:font-bold transition-opacity ease-in-out duration-300 text-sm tracking-normal">⬅️ Back</Link>
                        <button className="px-3 py-2 text-white bg-blue-500 rounded-md" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}