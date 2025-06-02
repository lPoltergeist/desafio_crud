"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState } from "react";
import { login } from "@/data/api/HttpClient";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/schemas/authSchema";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuthStore((state) => state.setToken);

  const handleLogin = async () => {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    try {
      const response = await login(email, password);
      setToken(response.data.token);
      toast.success("Success on login!", {
        autoClose: 1500,
      });

      if (response.data.token) {
        router.push('/products');
      }

    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error('Failed to login: ' + e.message);
      } else {
        toast.error('Failed to login: Unknown error');
      }
    }
  };

  const goToRegister = () => {
    router.push('/register');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="flex flex-col gap-6 w-full max-w-md"
      >
        <Input
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
          required
          autoComplete="email"
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
          required
          autoComplete="current-password"
        />
        <div className="flex gap-4 justify-center flex flex-col sm:flex-row pt-4">
          <Button type="submit" className="w-full sm:w-[100px]">Login</Button>
          <Button variant="ghost" type="button" className="w-full sm:w-[100px]" onPress={goToRegister}>Register</Button>
        </div>
      </form>
    </div>
  );
}
