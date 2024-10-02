"use client";
import axios from "axios";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface IUserCOntext {
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    role: string;
    profile_img: string;
  } | null;
  fetchUserData: () => void;
  setToken: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<null>>;
}
export const UserContext = createContext<IUserCOntext>({
  user: {
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    role: "",
    profile_img: "",
  },
  fetchUserData: () => {},
  setToken: () => {},
  setUser: () => {},
});
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    try {
      console.log("user user");
      const token = localStorage.getItem("token");
      console.log("token", token);
      const res = await axios.get(
        `http://localhost:8000/api/v1/auth/current-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setUser(res.data.user);
        console.log("USER", user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, fetchUserData, setToken, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
