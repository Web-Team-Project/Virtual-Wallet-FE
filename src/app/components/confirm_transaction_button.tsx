const ConfirmTransactionButton = ({ transactionId, sessionToken }: { transactionId: string, sessionToken: string }) => {
    const confirmTransaction = async () => {
        try {
            if (!sessionToken) {
                throw new Error("User not authenticated.");
            }

            const response = await fetch(`http://localhost:8000/api/v1/transactions/${transactionId}/confirm`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionToken}` // Use the passed token
                }
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to confirm transaction: ${errorText}`);
            }
            const data = await response.json();
            console.log('Transaction confirmed:', data);
        } catch (error) {
            console.error('Failed to confirm transaction:', error);
        }
    };

    return (
        <button onClick={confirmTransaction} className="bg-blue-500 text-white px-2 py-1 rounded">
            Confirm Transaction
        </button>
    );
};

export default ConfirmTransactionButton;
