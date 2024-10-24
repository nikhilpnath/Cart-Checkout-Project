import { Form, useActionData } from "@remix-run/react";
import { useEffect } from "react";

interface PropTypes {
  readOnly: boolean;
  setEmailSubmit: (readOnly: boolean) => void;
}

interface ActionType {
  email?: string | undefined;
  error?: string | undefined;
}

export default function Email({
  readOnly,
  setEmailSubmit,
}: PropTypes): JSX.Element {

  const { error, email } = useActionData<ActionType>() || {};


  useEffect(() => {
    setEmailSubmit(email ? true : false);
  }, [email]);

  return (
    <div className=" form_center mt-5 md:mt-0">
      <Form method="post">
        <h2>Email Address</h2>
        <input type="hidden" name="actiontype" value="email" />
        <div>
          <input
            type="email"
            required
            name="email"
            className={`input ${readOnly ? "focus:outline-none" : ""}`}
            readOnly={readOnly}
          />

          {error && <p className="text-red-600 mb-2">{error}</p>}
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={readOnly}
            className={`button ${readOnly ? "bg-[#7d9f8a]" : "bg-green-700"}`}
          >
            Continue
          </button>
        </div>
      </Form>
    </div>
  );
}
