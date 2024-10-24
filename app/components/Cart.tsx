import { useLoaderData } from "@remix-run/react";
import { Item, Cart as CartType } from "~/types/types";
import { BsCart2 } from "react-icons/bs";

type PropType = {
  title: string;
  responsiveStyles:string;
};

export default function Cart({ title, responsiveStyles }: PropType): JSX.Element {
  const { cart } = useLoaderData<CartType>() || undefined;

  return (
    <div className={`border-2 border-[#e1e1e1] h-fit py-4 px-6 bg-white flex-1 w-full ${responsiveStyles}`}>
      <div className="flex gap-1">
        <BsCart2 className="text-2xl" />
        <h2>{title}</h2>
      </div>
      {cart &&
        cart.items?.map((item: Item) => (
          <div key={item.id}>
            <div className="sm:flex justify-between ">
              <div className="sm:w-[61%]">
                <p className="2xl:text-xl">
                  {item.quantity} x {item.name}
                </p>
                <p className="text-sm 2xl:text-md text-[#676768] my-1 ">
                  You&apos;re just one step away from owning this
                  <span className="hidden md:inline">
                    {" "}
                    popular item already in your cart
                  </span>
                  !
                </p>
              </div>
              <p>$ {item.price}</p>
            </div>
            <hr className="my-3" />
          </div>
        ))}

      <p className="font-semibold text-right">
        Sub Total : {cart.totalAmount} {cart.currency}
      </p>
    </div>
  );
}
