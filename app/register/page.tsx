"use client";

import { Input } from "@heroui/input";
import { Button } from '@heroui/button';
import { useState } from "react";
import { createUser } from "@/data/api/HttpClient";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/schemas/authSchema";
import { toast } from "react-toastify";

export default function Register() {
  const router = useRouter()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [country, setCountry] = useState("");
  const [ddd, setDDD] = useState("");
  const [number, setNumber] = useState("");
  const setToken = useAuthStore((state) => state.setToken);

  const handleCreateUse = async () => {

    const userData = {
      name: name,
      email: email,
      password: password,
      verifyPassword: verifyPassword,
      phone: {
        country: country,
        ddd: ddd,
        number: number
      }
    }

    const result = registerSchema.safeParse(userData);

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    try {
      if (password === verifyPassword) {
        const response = await createUser(userData);
        setToken(response.data.token)

        console.log(response.data)
      } else {
        console.log("Senhas não conferem")
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        const backendMessage = error.response.data.message;
        toast.error(backendMessage);
      } else {
        console.log('Erro inesperado:', error.message);
        toast.error(error.message);
      }
    }
  }

  const goToLogin = () => {
    router.push('/')
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Input placeholder="name" type="name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input placeholder="verify password" type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
        <Input placeholder="country" type="string" value={country} onChange={(e) => setCountry(e.target.value)} />
        <Input placeholder="DDD" type="string" value={ddd} onChange={(e) => setDDD(e.target.value)} />
        <Input placeholder="number" type="string" value={number} onChange={(e) => setNumber(e.target.value)} />

        <div className="flex gap-4 center" >
          <Button className="cursor-pointer w-[100px]" onClick={handleCreateUse}>Register</Button>
          <Button className="cursor-pointer w-[100px]" onClick={goToLogin}>Back</Button>
        </div>
      </main>
    </div>
  );
}

