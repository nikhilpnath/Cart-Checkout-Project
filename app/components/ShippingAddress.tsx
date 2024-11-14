import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useRemixForm } from "remix-hook-form";
import { Country } from "~/types/types";
import { FormData, resolver } from "~/utils/validation/addressFormValidation";

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

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
    stringifyAllValues: false,
    // Prevents form data from being wrapped in quotes during submission
  });

  return (
    <div className=" form_center">
      <Form method="post" onSubmit={handleSubmit}>
        <fieldset disabled={readOnly}>
          <input
            type="hidden"
            {...register("actiontype")}
            value="shippingAddress"
          />
          <input type="hidden" {...register("id")} value={id} />
          <h2>Shipping address</h2>
          <div>
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              {...register("fname")}
              id="fname"
              className={`input ${readOnly ? "focus:outline-none" : ""}`}
            />
            {errors.fname && <p className="error">{errors.fname.message}</p>}
          </div>
          <div>
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              {...register("lname")}
              id="lname"
              className={`input ${readOnly ? "focus:outline-none" : ""}`}
            />
            {errors.lname && <p className="error">{errors.lname.message}</p>}
          </div>
          {countries.length > 0 && (
            <div>
              <label htmlFor="country">Country</label>
              <select
                {...register("country")}
                id="country"
                onChange={(e) => setCountry(e.target.value)}
                className="block p-[2px] focus:outline-[#0070b3] w-full border-2 border-[#6b7280] bg-white mb-3"
              >
                {countries?.map((country) => (
                  <option value={country.code} key={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>

              {errors.country && (
                <p className="error">{errors.country.message}</p>
              )}
            </div>
          )}
          <div>
            <label htmlFor="streetAdd">Street Address</label>
            <input
              type="text"
              {...register("streetAddress")}
              id="streetAdd"
              className={`input ${readOnly ? "focus:outline-none" : ""}`}
            />
            {errors.streetAddress && (
              <p className="error">{errors.streetAddress.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              {...register("city")}
              id="city"
              className={`input ${readOnly ? "focus:outline-none" : ""}`}
            />
            {errors.city && <p className="error">{errors.city.message}</p>}
          </div>
          <div>
            <label htmlFor="state">
              State {country === "US" ? "(Required)" : ""}
            </label>
            <input
              type="text"
              {...register("state")}
              id="state"
              className={`input ${readOnly ? "focus:outline-none" : ""}`}
            />
            {errors.state && <p className="error">{errors.state.message}</p>}
          </div>
          <div>
            <label htmlFor="zip">Zip Code</label>
            <input
              type="text"
              {...register("zip")}
              id="zip"
              className={`input ${readOnly ? "focus:outline-none" : ""}`}
            />
            {errors.zip && <p className="error">{errors.zip.message}</p>}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className={`button ${readOnly ? "bg-[#7d9f8a]" : "bg-green-700"}`}
            >
              Continue
            </button>
          </div>
        </fieldset>
      </Form>
    </div>
  );
}
