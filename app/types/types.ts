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

export interface Address {
    id: string;
    fname: string;
    lname: string;
    country: string;
    streetAddress: string;
    city: string;
    state?: string | undefined;
    zip: string;

}
