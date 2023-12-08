'use client';

import useDeleteProduct from "@/features/products/useDeleteProduct";
import useFetchProducts from "@/features/products/useFetchProducts"
import Link from "next/link";

export default function Products() {
    const { data, isLoading, refetch } = useFetchProducts();

    const { mutate } = useDeleteProduct({
        onSuccess: () => refetch()
    });

    function confirmtionDelete(id_product: number) {
        const shouldDelete: boolean = confirm('Are you sure?');
        if (shouldDelete) mutate(id_product)
    }

    function renderProductList() {
        return data?.map(product => (
            <tr key={product.id_product}>
                <td className="px-4 py-2 border">{product.id_product}</td>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">{product.qty}</td>
                <td className="px-4 py-2 border">${product.price}</td>
                <td className="px-4 py-2 border">{product.description}</td>
                <td className="px-4 py-2 border w-52">
                    <div className="flex items-center gap-2">
                        <Link href={`/products/${product.id_product}`} className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 hover:cursor-pointer rounded-md">Detail</Link> | 
                        <Link href={`/products/edit/${product.id_product}`} className="px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 hover:cursor-pointer rounded-md">Update</Link> | 
                        <button onClick={() => confirmtionDelete(product.id_product)} className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 hover:cursor-pointer rounded-md">Delete</button>
                    </div>
                </td>
            </tr>
        ));
    }

    if (isLoading) return <div>loading...</div>

    return (
        <div className="container mx-auto">
            <header>
                <nav className="flex">
                    <Link href={"/products/add"} className="w-full bg-blue-500 hover:bg-blue-600 m-4 mx-auto py-2 rounded-md text-center hover:cursor-pointer">Insert Product</Link>
                </nav>
            </header>
            <div className="overflow-x-auto">
                <h1 className="text-center text-2xl">Products List</h1>
                <table className="min-w-full table-auto border border-collapse">
                    <thead className="bg-gray-700">
                        <tr>
                            <th scope="col" className="border border-gray-300 px-4 py-2 tracking-wider">ID</th>
                            <th scope="col" className="border border-gray-300 px-4 py-2 tracking-wider">Name</th>
                            <th scope="col" className="border border-gray-300 px-4 py-2 tracking-wider">Qty</th>
                            <th scope="col" className="border border-gray-300 px-4 py-2 tracking-wider">Price</th>
                            <th scope="col" className="border border-gray-300 px-4 py-2 tracking-wider">Description</th>
                            <th scope="col" className="border border-gray-300 px-4 py-2 tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderProductList()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}