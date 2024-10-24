import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { Country } from "~/types/types";

interface PropTypes {
  country: string;
  readOnly: boolean;
  setShippingSubmit: (readOnly: boolean) => void;
  setAddress: (readOnly: boolean) => void;
  setEmail: (readOnly: boolean) => void;
}

interface ActionDataType {
  method?: string | undefined;
  id: string;
}

export default function ShippingMethods({
  country,
  readOnly,
  setShippingSubmit,
  setAddress,
  setEmail,
}: PropTypes): JSX.Element {
  const { countries } = useLoaderData<{ countries: Country[] }>();
  const { method, id } = useActionData<ActionDataType>() || {};

  const deliveryMethods = countries.find(
    (countryItem) => countryItem.code === country
  )?.shippingMethods as string[];

  useEffect(() => {
    if (method) {
      setShippingSubmit(true);
      setAddress(true), setEmail(true);
    }
  }, [method]);

  return (
    <div className="my-4 form_center">
      <Form method="post">
        <input type="hidden" name="actiontype" value="shippingMethod" />
        <input type="hidden" name="id" value={id} />
        <h2>Shipping Methods</h2>

        {deliveryMethods?.length > 0 ? (
          deliveryMethods.map((method, index) => (
            <div key={index}>
              <input
                type="radio"
                id={method.toLowerCase()}
                name="shipping_method"
                value={method.toLowerCase()}
                className="mr-2"
                required
                disabled={readOnly}
              />
              <label htmlFor={method.toLowerCase()}>{method}</label>
            </div>
          ))
        ) : (
          <p>No shipping methods available for this country.</p>
        )}

        <div className="text-center">
          <button
            disabled={readOnly}
            type="submit"
            className={`button mt-3 ${
              readOnly ? "bg-[#7d9f8a]" : "bg-green-700"
            }`}
          >
            Continue
          </button>
        </div>
      </Form>
    </div>
  );
}
