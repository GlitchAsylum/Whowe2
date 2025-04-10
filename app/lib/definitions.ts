export type Story = {
    id: string;
    user_id: string,
    date: string,
    status: 'pending' | 'approved'
}