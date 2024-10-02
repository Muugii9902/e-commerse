"use client";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

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
});
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    role: "",
    profile_img: "",
  });
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
    if (!user) {
      fetchUserData();
    }
  }, [user?._id]);

  return (
    <UserContext.Provider value={{ user, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};
