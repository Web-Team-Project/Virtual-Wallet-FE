"use server"
import { cookies } from "next/headers";

const handleCreateWallet = async (phone: string) => {
    const cookiesStore = cookies()
    const user = cookiesStore.get("user")

    if (user === undefined){
        console.log("User not found")
        return
    }
    else {
        try{

            const response = await fetch("http://localhost:8000/api/v1/wallets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `user=${user.value}` // Send the cookie in the request headers
                },
                    credentials: "include",
                    body: JSON.stringify({ currency: phone }),
            });
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error("An error occurred while creating wallet:", error);
        }
    }
  };

  const fetchWallets = async () => {
    const cookiesStore = cookies()
    const user = cookiesStore.get("user")

    if (user === undefined){
        console.log("User not found")
        return
    }
    else {
        try{

            const response = await fetch("http://localhost:8000/api/v1/wallets/balance", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `user=${user.value}` // Send the cookie in the request headers
                },
                    credentials: "include",
            });
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error("An error occurred while creating wallet:", error);
        }
    }
  };

export {handleCreateWallet, fetchWallets};