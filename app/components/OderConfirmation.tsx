import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { CiCircleCheck } from "react-icons/ci";

interface Address {
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  streetAddress: string;
  zipcode: string;
  country: string;
}

interface LoaderData {
  orderId: string;
  address: Address;
  payment: string;
  email: string;
}

export default function OderConfirmation() {
  const { orderId, address, email, payment } = useLoaderData() as LoaderData;
  const navigate = useNavigate();

  return (
    <div className="w-[80%] mx-auto">
      {/* confirmation */}
      <section className="flex items-center gap-2">
        <CiCircleCheck className="text-5xl" />
        <div>
          <p className="font-semibold text-xs min-[360px]:text-sm">
            Order #{orderId}
          </p>
          <h2>Thank You {address.firstName}!</h2>
        </div>
      </section>

      {/* order-updates */}
      <section>
        <div className="border-2 border-[#e1e1e1] mt-5 mb-3 px-3 py-1">
          <p className="text-base min-[360px]:text-lg">Order Updates</p>
          <p className="text-xs min-[360px]:text-sm text-[#676768]">
            You will recieve order and shipping updates via email
          </p>
        </div>
        <img src="/location.png" alt="location" />
      </section>

      {/* contact */}
      <section className="border-2 border-[#e1e1e1] my-5">
        <div className="contact border-b-2 ">
          <p>Contact</p>
          <p className="max-[400px]:text-[#808080]">{email}</p>
        </div>

        <div className="contact border-b-2 ">
          <p>Address</p>
          <div className="text-left min-[400px]:text-right max-[400px]:text-[#808080] ">
            <p>
              {address.firstName} {address.lastName}
            </p>
            <p>
              {address.streetAddress}, {address.city}
            </p>
            <p>
              {address.state}, {address.zipcode}, {address.country}
            </p>
          </div>
        </div>

        <div className="contact">
          <p>Payment</p>
          <p className="max-[400px]:text-[#808080]">{payment}</p>
        </div>
      </section>

      <section className="flex justify-between items-center">
        <p className="text-sm sm:text-md">
          Back to{" "}
          <Link to="/" className="text-sky-700 underline">
            Home
          </Link>
        </p>
        <button
          className="bg-black text-white px-4 py-2 rounded text-sm sm:text-md"
          onClick={() => navigate("/checkout", { replace: true })}
        >
          Continue <span className="hidden sm:inline">Shopping</span>
        </button>
      </section>
    </div>
  );
}
