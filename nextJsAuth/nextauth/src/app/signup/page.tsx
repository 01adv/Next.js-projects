'use client'
import React, { useEffect, useState } from "react";

import axios from "axios";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {

  const router = useRouter();

  const [user, setUser] = useState({
    email:"",
    password: "",
    username: ""
  });

  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [loading, setLoading] = useState(false)
  const onSignUp = async () => {
    try {
      setLoading(true)
      
      const response = await axios.post(
        "/api/users/signup",
        user
      );
      console.log(response.data);
      toast.success("SignUp Successful");
      router.push("/login");
      // setLoading(false)
      // setButtonDisabled(false)

    } catch (error: any) {
      console.log("SignUp Failed", error);
      toast.error(error.response.data.message);
      // setLoading(false)
      // setButtonDisabled(false)
    }
  }

  useEffect(() =>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false)
    }
    else(
      setButtonDisabled(true)
    )
  }, [user])

  return(

    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading? "Loading..." : "Sign Up"}</h1>
      <hr />
      <label htmlFor="username"></label>
      <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-indigo-300 text-black" id="username" type="text" name="username" placeholder="Username" value = {user.username} onChange={(e) => setUser({...user, username: e.target.value})} />
      <hr />

      <label htmlFor="email"></label>
      <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-indigo-300 text-black" id="email" type="email" name="email" placeholder="Email" value = {user.email} onChange={(e) => setUser({...user, email: e.target.value})} />
      <hr />

      <label htmlFor="password"></label>
      <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-indigo-300 text-black" id="password" type="password" name="password" placeholder="Password" value = {user.password} onChange={(e) => setUser({...user, password: e.target.value})} />
      <hr />

      <button onClick={onSignUp} className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled? "No SignUp" : "SignUp  "}</button>
      <Link href={"/login"}>Visit Login Page</Link>
    </div>
  )
}
