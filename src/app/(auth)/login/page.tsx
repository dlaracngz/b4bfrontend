"use client";

import { useState } from "react";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { login } from "@/api/authApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const result = await login({
        username,
        password,
      });

      console.log("Giriş başarılı:", result);

      dispatch(loginSuccess());

      router.push("/products");
    } catch (error) {
      console.error("Giriş başarısız:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-[400px] rounded-xl border border-gray-200 p-8">
        <h1 className="mb-2 text-center text-3xl font-semibold text-black">
          B4B
        </h1>

        <p className="mb-6 text-center text-gray-600">Hesabınıza giriş yapın</p>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-black">
            Kullanıcı Adı
          </label>

          <InputField
            type="text"
            placeholder="Kullanıcı adınızı girin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="mb-1 block text-sm font-medium text-black">
            Şifre
          </label>

          <InputField
            type="password"
            placeholder="Şifrenizi girin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="button" onClick={handleLogin} className="w-full">
          Giriş Yap
        </Button>
      </div>
    </div>
  );
}
