"use server"
import { cookies } from "next/headers";

const handleCreateWallet = async (currency: string) => {
    const cookiesStore = cookies()
    const user = cookiesStore.get("user")

    if (user === undefined){
        console.log("User not found")
        return
    }
    else {
        try{
            const response = await fetch("https://virtual-wallet-87bx.onrender.com/api/v1/wallets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `user=${user.value}`
                },
                    credentials: "include",
                    body: JSON.stringify({ currency }),
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
            const response = await fetch("https://virtual-wallet-87bx.onrender.com/api/v1/wallets/balance", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `user=${user.value}`
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

export { handleCreateWallet, fetchWallets };