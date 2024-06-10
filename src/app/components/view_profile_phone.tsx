"use server";
import { cookies } from "next/headers";
import {jwtVerify} from "jose";
import * as http from "http";


const handleViewProfile = async () => {
    const cookiesStore = cookies()
    const user = cookiesStore.get("user");

    if (user === undefined){
        console.log("User not found");
        return
    }
    else {
        const verified = await jwtVerify(user.value, new TextEncoder().encode("yoursecretkey"));
        const response = await fetch(`http://localhost:8000/api/v1/users/${verified.payload.email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const data = await response.json();
        return data;
    }
};


const handleAddPhone = async (phone: any) => {
    const cookiesStore = cookies()
    const user = cookiesStore.get("user")

    if (user === undefined){
        console.log("User not found")
        return
    } else {
        const response = await fetch("http://localhost:8000/api/v1/users/phone", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `user=${user.value}`
            },
            credentials: "include",
            body: JSON.stringify({ phone_number: phone }),
        });
        const data = await response.json();
        return data;
    }
};

const handleVerifyPhone = async (code: any) => {
    const cookiesStore = cookies()
    const user = cookiesStore.get("user")

    if (user === undefined){
        console.log("User not found")
        return
    } else {
        const response = await fetch("http://localhost:8000/api/v1/verify_phone", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `user=${user.value}`
            },
            credentials: "include",
            body: JSON.stringify({ code }),
        });
        const data = await response.json();
        return data;
    }
};

  export { handleViewProfile, handleAddPhone, handleVerifyPhone};