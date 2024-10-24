import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { Country } from "~/types/types";

interface PropTypes {
  readOnly: boolean;
  setAddressSubmit: (readOnly: boolean) => void;
  setEmail: (readOnly: boolean) => void;
  country: string;
  setCountry: (readOnly: string) => void;
}

interface ActionDataType {
  address: boolean | undefined;
  id: string;
}

export default function ShippingAddress({
  readOnly,
  setAddressSubmit,
  setEmail,
  country,
  setCountry,
}: PropTypes): JSX.Element {
  const { countries } = useLoaderData<{ countries: Country[] }>();
  const { address, id } = useActionData<ActionDataType>() || {};

  useEffect(() => {
    if (address) {
      setAddressSubmit(true);
      setEmail(true);
    }
  }, [address]);

  return (
    <div className=" form_center">
      <Form method="post" >
        <input type="hidden" name="actiontype" value="shippingAddress" />
        <input type="hidden" name="id" value={id} />
        <h2>Shipping address</h2>
        <div>
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            name="fname"
            id="fname"
            required
            readOnly={readOnly}
            className={`input ${readOnly ? "focus:outline-none" : ""}`}
          />
        </div>
        <div>
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            name="lname"
            id="lname"
            required
            readOnly={readOnly}
            className={`input ${readOnly ? "focus:outline-none" : ""}`}
          />
        </div>
        {countries.length > 0 && (
          <div>
            <label htmlFor="country">Country</label>
            <select
              name="country"
              id="country"
              required
              onChange={(e) => setCountry(e.target.value)}
              className="block p-[2px] focus:outline-[#0070b3] w-full border-2 border-[#6b7280] bg-white mb-3"
              disabled={readOnly}
            >
              {countries?.map((country) => (
                <option value={country.code} key={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="streetAdd">Street Address</label>
          <input
            type="text"
            name="streetAdd"
            id="streetAdd"
            className={`input ${readOnly ? "focus:outline-none" : ""}`}
            readOnly={readOnly}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            className={`input ${readOnly ? "focus:outline-none" : ""}`}
            readOnly={readOnly}
          />
        </div>
        <div>
          <label htmlFor="state">
            State {country === "US" ? "(Required)" : ""}
          </label>
          <input
            type="text"
            name="state"
            id="state"
            required={country === "US" ? true : false}
            className={`input ${readOnly ? "focus:outline-none" : ""}`}
            readOnly={readOnly}
          />
        </div>
        <div>
          <label htmlFor="zip">Zip Code</label>
          <input
            type="text"
            name="zip"
            id="zip"
            required
            className={`input ${readOnly ? "focus:outline-none" : ""}`}
            readOnly={readOnly}
          />
        </div>
        <div className="text-center">
          <button
            disabled={readOnly}
            type="submit"
            className={`button ${readOnly ? "bg-[#7d9f8a]" : "bg-green-700"}`}
          >
            Continue
          </button>
        </div>
      </Form>
    </div>
  );
}
