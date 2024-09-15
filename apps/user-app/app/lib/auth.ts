import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth"
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import { z } from "zod";

const signinSchema = z.object({
     number: z.number().positive(),
     password: z.string().min(4, "Password is too small").max(20, "Password is too long"),
});

export const authOptions = {
     providers: [
          CredentialsProvider({
               name: "Credentials",
               credentials: {
                    number: { label: "Phone Number", type: "number" },
                    password: { label: "Password", type: "password" }
               },
               async authorize(credentials: any) {
                    const { number, password } = credentials;
                    const parsed = signinSchema.safeParse({ number: Number(number), password });
                    if (!parsed.success) return null;
                    console.log("number: ", number, password);
                    const user = await prisma.user.findFirst({
                         where: {
                              number: Number(number),
                         }
                    })
                    if (!user) return null;
                    const verifyPassword = await bcrypt.compare(password, user.password);
                    if (!verifyPassword) return null;
                    return {
                         id: user.id.toString(),
                         number: user.number,
                         name: user.name
                    }
               }
          })
     ],
     secret: process.env.NEXTAUTH_SECRET || "secret",
     pages: {
          signIn: '/auth/signin'
     }
} satisfies NextAuthOptions;