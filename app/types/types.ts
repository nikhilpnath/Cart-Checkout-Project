export interface Item {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

interface Carttype {
    id: string;
    totalAmount: number;
    currency: string;
    items: Item[];
    customerId?: number;
}

export interface Cart {
    cart: Carttype
}


export interface Country {
    id: string;
    name: string;
    code: string;
    shippingMethods: Array<string>;
}
