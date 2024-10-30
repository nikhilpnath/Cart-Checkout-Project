import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";


const validationMessages = {
    required: (field: string) => `${field} is required`,
    invalidZip: "Invalid Zip Code format",
};

export const schema = zod.object({
    actiontype: zod.string(),
    id: zod.string(),
    fname: zod.string().min(1, { message: validationMessages.required("First Name") }),
    lname: zod.string().min(1, { message: validationMessages.required("Last Name") }),
    streetAddress: zod.string().min(1, { message: validationMessages.required("Street Address") }),
    city: zod.string().min(1, { message: validationMessages.required("City") }),
    country: zod.string().min(1, { message: validationMessages.required("Country") }),
    state: zod.string().optional(),
    zip: zod
        .string()
        .min(1, { message: validationMessages.required("Zip code") })
        .regex(/^\d{5,6}$/, { message: validationMessages.invalidZip })

}).superRefine((data, ctx) => {

    if (data.country === "US" && !data.state) {
        ctx.addIssue({
            path: ["state"],
            message: validationMessages.required("State"),
            code: zod.ZodIssueCode.custom
        })
    }
});


export type FormData = zod.infer<typeof schema>;

export const resolver = zodResolver(schema);


