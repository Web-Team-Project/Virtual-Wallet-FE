interface Transaction {
    id: string;
    amount: number;
    category: string;
    status: string;
    created_at: string;
    card_id: string;
    recipient_id: string;
    currency: string;
    sender_id: string;
}