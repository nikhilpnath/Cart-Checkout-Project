import { gql } from "@apollo/client";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { useState } from "react";
import {
  Cart,
  Email,
  Payment,
  ShippingAddress,
  ShippingMethods,
} from "~/components";
import { client } from "~/graphql/client.server";
import {
  addAddress,
  addEmail,
  addOrderData,
  addShippingMethod,
  getCountries,
} from "~/utils/data.server";

export default function Checkout(): JSX.Element {
  const [isEmailSubmitted, setIsEmailSubmitted] = useState<boolean>(false);
  const [isAddressSubmitted, setIsAddressSubmitted] = useState<boolean>(false);
  const [isShippingMethodSubmitted, setIsShippingMethodSubmitted] =
    useState<boolean>(false);

  const [country, setCountry] = useState<string>("IN");

  return (
    <>
      <div
        className={`md:flex gap-9 py-7 px-9 bg-neutral-100 ${
          !isEmailSubmitted && "h-screen"
        }`}
      >
        {/* cart section */}
        <Cart
          title="Cart Summary"
          responsiveStyles="sm:w-[60%] sm:mx-auto md:w-full"
        />

        <div className="flex-[2_1_0%] order-first">
          {/* email */}
          <Email
            readOnly={isEmailSubmitted}
            setEmailSubmit={setIsEmailSubmitted}
          />

          {/* shipping address */}
          {isEmailSubmitted && (
            <ShippingAddress
              readOnly={isAddressSubmitted}
              setAddressSubmit={setIsAddressSubmitted}
              setEmail={setIsEmailSubmitted}
              country={country}
              setCountry={setCountry}
            />
          )}

          {/* shipping methods */}
          {isEmailSubmitted && isAddressSubmitted && (
            <ShippingMethods
              country={country}
              readOnly={isShippingMethodSubmitted}
              setShippingSubmit={setIsShippingMethodSubmitted}
              setAddress={setIsAddressSubmitted}
              setEmail={setIsEmailSubmitted}
            />
          )}

          {/* payment */}
          {isEmailSubmitted &&
            isAddressSubmitted &&
            isShippingMethodSubmitted && <Payment />}
        </div>
      </div>
    </>
  );
}

export const loader = async () => {
  const query = await client.query({
    query: gql`
      query Cart($id: ID!) {
        Cart(id: $id) {
          id
          totalAmount
          currency
          customerId
          items
        }
      }
    `,
    variables: { id: 1 },
  });

  const countries = await getCountries();

  return { cart: query.data.Cart, countries };
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  if (formData.get("actiontype") === "email") {
    const emailData = formData.get("email") as string;

    try {
      const result = await addEmail(emailData);
      return { email: result.email, id: result.id };
    } catch (err) {
      const error = err as Error & { name: string };

      if (error.name === "emailExists") {
        return { error: error.message };
      }
    }
  } else if (formData.get("actiontype") === "shippingAddress") {
    const addressInputs = Object.fromEntries(formData);
    const { address, id } = (await addAddress(addressInputs)) as {
      address: boolean;
      id: string;
    };

    return { address, id };
  } else if (formData.get("actiontype") === "shippingMethod") {
    const id = formData.get("id") as string;
    const shippingMethod = formData.get("shipping_method") as string;

    return addShippingMethod(shippingMethod, id);
  } else if (formData.get("actiontype") === "orderSubmit") {
    const Orderdata = Object.fromEntries(formData);

    const result = await addOrderData(Orderdata);

    if (result.payment) {
      return redirect(`/confirmation?success=true&orderId=${result.orderId}`);
    }
    return null;
  }

  return null;
}
