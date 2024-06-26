"use server"
import { addRating } from '@/app/components/apiRating';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await addRating(req, res); // Pass req and res to the function
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
