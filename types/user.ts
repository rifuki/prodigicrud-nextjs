export type Product = {
    id_product: number;
    name: string;
    qty: number;
    price: number;
    description?: string;
}

export type FormikPayload = {
    name: string;
    qty: number;
    price: number;
    description?: string;
}