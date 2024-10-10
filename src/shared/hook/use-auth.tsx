"use client";

import {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { usePathname, useRouter } from "next/navigation";
import { notification } from "antd";

import { GET_INFO_USER, LOGIN } from "#/shared/graphql/queries";
import { I_User } from "../typescript";

interface AuthContextType {
  user: I_User | null;
  loading: boolean;
  handleLogin: (infoLogin: any) => Promise<any>;
  handleLogout: () => void;
  refetchUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<I_User | null>(null);
  const [login] = useMutation(LOGIN);
  const { refetch, loading: queryLoading } = useQuery(GET_INFO_USER);
  const pathname = usePathname();
  const router = useRouter();

  const refetchUser = useCallback(async () => {
    try {
      const { data } = await refetch();
      setUser(data?.getInfoUser || null);
      console.log(data?.getInfoUser);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      setUser(null);
    }
  }, [refetch]);

  useEffect(() => {
    refetchUser();
  }, [refetchUser, pathname]);

  const handleLogin = async (infoLogin: any) => {
    try {
      const res = await login({
        variables: {
          email: infoLogin.email,
          password: infoLogin.password,
        },
      });
      if (res.data.login) {
        localStorage.setItem("auth", res.data.login.token);
        await refetchUser();
      }
      res.data.login
        ? notification.success({
            message: "Thành công",
            description: "Đăng nhập thành công",
          })
        : notification.error({
            message: "Thất bại",
            description: "Đăng nhập thất bại",
          });
      return res.data.login;
    } catch (error) {
      console.error("Login failed:", error);
      return null;
    }
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("auth");
    setUser(null);
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: queryLoading,
        handleLogin,
        handleLogout,
        refetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
