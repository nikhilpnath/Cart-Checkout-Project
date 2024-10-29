import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { useEffect, useState } from "react";

import { Cart } from "~/types/types";

const PAYMENTS = ["Google Pay", "Cash On Delivery", "Credit Card", "Paypal"];

interface ActionType {
  id: string;
}

export default function Payment(): JSX.Element {
  const {
    cart: { customerId, currency, items, totalAmount },
  } = useLoaderData<Cart>();

  const { id } = useActionData<ActionType>() || {};

  const fetcher = useFetcher();
  const [error, setError] = useState<string>("");

  //get submitted data in fetcher.data - returned from action
  useEffect(() => {
    const data = fetcher.data as { error?: string | undefined };
    if (data && data.error) {
      setError(data.error);
    }
  }, [fetcher.data]);

  const orderId = `ORD-${new Date().valueOf()}`;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const paymentData = Object.fromEntries(formData);

    const orderPayload = {
      ...paymentData,
      orderId,
      id: id || "",
      customerId: String(customerId),
      currency,
      totalAmnt: String(totalAmount),
      items: JSON.stringify(items),
    };

    fetcher.submit(orderPayload, { method: "post" });
  };

  return (
    <div className=" form_center">
      <Form onSubmit={handleSubmitOrder}>
        <input type="hidden" name="actiontype" value="orderSubmit" />
        <h2>Payment</h2>

        {PAYMENTS.map((payment, index) => (
          <div key={index}>
            <input
              type="radio"
              id={payment}
              name="payment"
              value={payment}
              className="mr-2"
              required
            />
            <label htmlFor={payment}>{payment}</label>
          </div>
        ))}
        {error && <p className="text-red-700 mt-3 text-lg">{error}</p>}
        <div className="text-center">
          <button type="submit" className="bg-green-700 button mt-3">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}
