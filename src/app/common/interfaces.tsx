interface Transaction {
    id: string;
    amount: number;
    category: string;
    status: string;
    created_at: string;
    card_number: string;
    recipient_email: string;
    currency: string;
    sender_id: string;
}