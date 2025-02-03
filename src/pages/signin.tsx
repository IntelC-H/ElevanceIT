import React, { useState, useEffect } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/router";
import { trpc } from "~/utils/trpc";
import { useAuthStore } from "~/store/useAuthStore";

const SignInPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [clerkLoaded, setClerkLoaded] = useState(false);
  const { setAdmin } = useAuthStore();

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: async (data) => {
      console.log("data", data);

      localStorage.setItem("token", data.token);

      setAdmin(true);
      router.push("/Admin");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSignIn = async () => {
    setError(null);
    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border p-6 shadow-md rounded-lg bg-white w-80">
        <h2 className="text-lg font-semibold mb-4 text-center">Sign In</h2>
        <div className="space-y-4">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="w-full bg-blue-600 text-white"
            onClick={handleSignIn}
            disabled={loginMutation.isLoading}
          >
            {loginMutation.isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
