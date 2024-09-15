"use server";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import { z } from "zod";

interface SignupProps {
     name: string;
     number: number;
     password: string;
}

interface SignupResponse {
     success: boolean;
     message?: string;
     error?: string;
}

const SignupSchema = z.object({
     name: z.string().min(1, "Name is required").max(20, "Name is too larg"),
     number: z.number(),
     password: z.string().min(4, "Password is too small").max(20, "Password is too long"),
})

export async function signup({ name, number, password }: SignupProps): Promise<SignupResponse> {
     try {
          const { success, error } = SignupSchema.safeParse({ name, number, password });
          if (!success) {
               console.log(error);
               return {
                    success: false,
                    error: error.issues[0]?.message || "Invalid input"
               }
          }
          const isExist = await prisma.user.findFirst({
               where: { number }
          });
          if (isExist) {
               return { 
                    success: false,
                    error: "Phone number is already registerd"
               };
          }
          const hashPassword = await bcrypt.hash(password, 10);
          await prisma.user.create({
               data: {
                    name,
                    number,
                    password: hashPassword,
               }
          });
          return {
               success: true,
               message: "Signup successfully"
          }
     } catch (e: any) {
          console.error(e);
          return {
               success: false,
               error: e.message || "Somwthing went wrong"
          }
     }
}