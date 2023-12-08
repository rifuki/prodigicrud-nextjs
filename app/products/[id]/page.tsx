'use client';

import useFetchProduct from "@/features/products/useFetchProduct";

interface Params {
    id: number;
}

export default function ProductsID({params}: {params: Params}) {
    const { data, isLoading } = useFetchProduct({id_product: params.id});

    if (isLoading) return <div>loading...</div>

    if(!data) return <div>Data is empty...</div>
    return <div>
        <div>product name: <span>{data.name}</span></div>
        <div>product qty: <span>{data.qty}</span></div>
        <div>product price: <span>{data.price}</span></div>
        <div>product description: <span>{data?.description}</span></div>
    </div>
}