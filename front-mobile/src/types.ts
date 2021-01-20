export type Order = {

    id: number;
    address: string;
    latidade: number;
    longitude: number;
    moment: string;
    status: string;
    total:number;
    products: Product[];
}

export type Product = {
    id: number;
    name:string;
    price:number;
    description:string;
    imageUrl:string;
}