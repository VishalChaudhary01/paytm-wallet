import { z } from "zod";

export const p2pSchema = z.object({
     toNumber: z.number().min(1, {message: "Enter valid phone number"}),
     amount: z.number().min(1, {message: "Enter valid amount"}).max(5000000, {message: "Max limit to transfer (50,000 Rs)"})
});

export type P2PType = z.infer<typeof p2pSchema>;
