import { gql } from '@apollo/client';
import { redirect } from '@remix-run/react';
import { prisma } from '~/db/db.server'
import { client } from '~/graphql/client.server';

export async function addEmail(email: string) {

    const emailExists = await prisma.email.findFirst({
        where: { email }
    })

    if (emailExists) {
        const error = new Error("Email Already Exists") as Error & { name?: string };
        error.name = 'emailExists';
        throw error;
    }

    const emailAddress = await prisma.email.create({
        data: {
            email
        }
    })
    const order = await prisma.order.create({
        data: {
            customerEmail: email
        }
    })

    return { email: emailAddress.email, id: order.id }

}


export async function getCountries() {
    return await prisma.country.findMany();
}


export async function addAddress(address: { [k: string]: FormDataEntryValue }) {

    const shippingAddress = {
        firstName: address.fname as string,
        lastName: address.lname as string,
        country: address.country as string,
        streetAddress: address.streetAdd as string,
        city: address.city as string,
        state: (address.state as string) || undefined,
        zipcode: address.zip as string,
    };

    try {

        await prisma.address.create({
            data: shippingAddress
        })

        const order = await prisma.order.update({
            where: { id: address.id as string },
            data: { shippingAddress },
        })

        return { address: true, id: order.id }
    }
    catch (err) {
        throw new Error("couldn't add any address")
    }
}

export async function addShippingMethod(ShippingMethod: string, id: string) {
    try {
        await prisma.shippingMethod.create({
            data: {
                method: ShippingMethod
            }
        })

        const order = await prisma.order.update({
            where: { id },
            data: { ShippingMethod }
        })

        return { method: true, id: order.id }
    }
    catch (err) {
        throw new Error("Couldn't add shipping method")
    }
}


export async function addOrderData(orderData: { [k: string]: FormDataEntryValue }) {

    const data = {
        id: orderData.id as string,
        payment: orderData.payment as string,
        orderId: orderData.orderId as string,
        customerId: Number(orderData.customerId) as number,
        currency: orderData.currency as string,
        totalAmnt: Number(orderData.totalAmnt) as number,
        items: JSON.parse(orderData.items as string),
    };


    try {

        const order = await prisma.order.update({
            where: { id: data.id },
            data: {
                payment: data.payment,
                orderId: data.orderId,
                items: data.items,
                totalAmount: data.totalAmnt,
                currency: data.currency,
                customerId: data.customerId
            }
        })


        await client.mutate({
            mutation: gql`
      mutation CreateOrder(
        $orderId: String!
        $items: JSON!
        $customerId: Int!
        $totalAmount: Float!
        $currency: String!
        $customerEmail: String!
        $shippingAddress: JSON!
        $shippingMethod: String!
        $payment: String!
        $createdTime: String!
        $updatedTime: String!
      ) {
        createOrder(
          orderId: $orderId
          items: $items
          customerId: $customerId
          totalAmount: $totalAmount
          currency: $currency
          customerEmail: $customerEmail
          shippingAddress: $shippingAddress
          shippingMethod: $shippingMethod
          payment: $payment
          createdTime: $createdTime
          updatedTime: $updatedTime
        ) {
          orderId
          items
        }
      }
    `,
            variables: {
                orderId: order.id,
                items: order.items,
                customerId: order.customerId,
                totalAmount: order.totalAmount,
                currency: order.currency,
                customerEmail: order.customerEmail,
                shippingAddress: order.shippingAddress,
                shippingMethod: order.ShippingMethod,
                payment: order.payment,
                createdTime: order.createdTime,
                updatedTime: order.updatedTime,
            }
        })

        return { payment: true, orderId: order.orderId }
    }
    catch (err) {
        await prisma.order.delete({ where: { id: data.id } })
        throw new Error("Error occured!, Couldn't complete your order")
    }

}


export async function getOrder(orderId: string) {

    const order = await prisma.order.findFirst({
        where: { orderId }
    })


    if (!order) {
        throw redirect("/checkout")
    }


    const cart = {
        totalAmount: order.totalAmount,
        currency: order.currency,
        items: order.items,
    }

    return { address: order.shippingAddress, payment: order.payment, email: order.customerEmail, orderId: order.orderId, cart }
}

