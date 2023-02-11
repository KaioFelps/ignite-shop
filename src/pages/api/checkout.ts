import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { productsList } = req.body;

    if (req.method !== "POST") {
        return res.status(405).json({error: "Method not allowed."})
    }

    if (!productsList || productsList.length === 0) {
        return res.status(400).json({error: "Nothing have been bought"})
    }
    
    const successURL = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    const failureURL = `${process.env.NEXT_URL}/`

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [...productsList],
        success_url: successURL,
        cancel_url: failureURL,
    })

    return res.status(201).json({
        checkoutUrl: checkoutSession.url,
    })
}