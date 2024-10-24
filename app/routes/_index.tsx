import { Link } from "@remix-run/react";

export default function _index() {
  return (
    <div className="  flex justify-center h-screen items-center">
      <div className="bg-red-800 w-1/3 text-center py-10  rounded-lg text-white">
        <p className="mb-7 text-xl">Home Page</p>
        <Link to="/checkout" className="underline">
          Checkout
        </Link>
      </div>
    </div>
  );
}
