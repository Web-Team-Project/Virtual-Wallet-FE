"use server";
import { cookies } from "next/headers";
import {jwtVerify} from "jose";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const checkCookies = () => {
    const cookiesStore = cookies()
    const user = cookiesStore.get("user")
    return user
}

const createGetFetch = async (url: string, user: RequestCookie) => {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cookie": `user=${user.value}`
        },
        credentials: "include",
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch: ${errorText}`);
    }
    const data = await response.json();
    return data;
}

const createPostFetch = async (url: string, user: RequestCookie, body: any) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": `user=${user.value}`
        },
        credentials: "include",
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch: ${errorText}`);
    }
    const data = await response.json();
    return data;
}

const createPutFetch = async (url: string, user: RequestCookie, body: any) => {
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Cookie": `user=${user.value}`
        },
        credentials: "include",
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch: ${errorText}`);
    }
    const data = await response.json();
    return data;
}

const createDeleteFetch = async (url: string, user: RequestCookie) => {
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Cookie": `user=${user.value}`
        },
        credentials: "include",
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch: ${errorText}`);
    }
    const data = await response.json();
    return data;
}

const fetchCategoriesServer = async () => {
    const user = checkCookies();
    if (user === undefined){
        console.log("User not found")
        return
    }
    const data = await createGetFetch("http://localhost:8000/api/v1/categories", user);
    return data;
}

const deleteCategoryServer = async (name: string) => {
    const user = checkCookies();
    if (user === undefined){
        console.log("User not found")
        return
    }
    const response = await fetch(`http://localhost:8000/api/v1/categories?category_name=${encodeURIComponent(name)}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Cookie": `user=${user.value}`
        },
        credentials: "include",
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete category: ${errorText}`);
    }
    const data = await response.json();
    return data;
}

const createCategoryServer = async (name: string) => {
    const user = checkCookies();
    if (user === undefined){
        console.log("User not found")
        return
    }
    createPostFetch("http://localhost:8000/api/v1/categories", user, { name });
    
};

const fetchTransactionsServer = async () => { 
    const user = checkCookies();
    if (user === undefined){
        console.log("User not found")
        return
    }
    const data = await createGetFetch("http://localhost:8000/api/v1/transactions", user);
    return data;
}

const handleViewProfile = async () => {
    const user = checkCookies();
    if (user === undefined){
        console.log("User not found")
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
    const user = checkCookies();
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
    const user = checkCookies();
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

const createTransactionServer = async (transaction: { amount: number; category: string; card_id: string; recipient_id: string; currency: string }) => {
    const user = checkCookies();
    if (user === undefined){
        console.log("User not found")
        return
    }
    createPostFetch("http://localhost:8000/api/v1/transactions", user, {
        amount: transaction.amount,
        currency: transaction.currency,
        card_id: transaction.card_id,
        recipient_id: transaction.recipient_id,
        category_id: transaction.category,
        timestamp: Date.now(),
    });
};

const updateUserRoleServer = async (userId: string, newRole: string) => {
    const user = checkCookies();
    if (user === undefined) {
        console.log("User not found");
        return;
    }
    const data = await createPutFetch(`http://localhost:8000/api/v1/users/${userId}/role`, user, { role: newRole });
    return data;
};

const deactivateUserServer = async (userId: string) => {
    const user = checkCookies();
    if (user === undefined) {
        console.log("User not found");
        return;
    }
    const data = await createPutFetch(`http://localhost:8000/api/v1/users/${userId}/deactivate`, user, {});
    return data;
};

const blockUserServer = async (userId: string) => {
    const user = checkCookies();
    if (user === undefined) {
        console.log("User not found");
        return;
    }
    const data = await createPutFetch(`http://localhost:8000/api/v1/users/${userId}/block`, user, {});
    return data;
};

const unblockUserServer = async (userId: string) => {
    const user = checkCookies();
    if (user === undefined) {
        console.log("User not found");
        return;
    }
    const data = await createPutFetch(`http://localhost:8000/api/v1/users/${userId}/unblock`, user, {});
    return data;
};

const fetchUsersServer = async (search: string, skip: number, limit: number) => {
    const userCookie = checkCookies();
    if (!userCookie) {
        throw new Error("User not found. Please log in.");
    }

    const url = `http://localhost:8000/api/v1/search/users?search=${encodeURIComponent(search)}&skip=${skip}&limit=${limit}`;
    const data = await createGetFetch(url, userCookie);
    return data;
};

  export { handleViewProfile, handleAddPhone, handleVerifyPhone,
    fetchTransactionsServer,createCategoryServer, fetchCategoriesServer, deleteCategoryServer, createTransactionServer, 
    updateUserRoleServer, deactivateUserServer, blockUserServer, unblockUserServer, fetchUsersServer};