import { LoaderFunctionArgs, redirect } from "react-router";
import { OderConfirmation, Cart } from "~/components";

import { getOrder } from "~/utils/data.server";

export default function Confirmation() {
  return (
    <div className="md:flex gap-9 py-4 sm:py-7 sm:px-9">
      <Cart title="Ordered Items" responsiveStyles="hidden md:block"/>

      <div className="flex-[2_1_0%] order-first">
        <OderConfirmation />
      </div>
    </div>
  );
}

//getting query strings
export function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  if (success && orderId) {
    return getOrder(orderId);
  }

  throw redirect("/checkout");
}
