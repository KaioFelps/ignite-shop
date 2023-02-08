// const price = product.default_price as Stripe.Price
// const convertedPrice = (price.unit_amount! / 100).toLocaleString("pt-br", {
//     style: "currency",
//     currency: "BRL",
// })

import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { stripe } from "../../../lib/stripe";

type ProductDataPropsType = {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    defaultPriceId: number;
    description: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query as {id: string}

    if (req.method !== "GET") {
        return res.status(405).json({error: "Method not allowed."})
    }

    if (!id) {
        return res.status(400).json({error: "Price not found"})
    }

    const product = await stripe.products.retrieve(id, {
        expand: ["default_price"]
    })

    const price = product.default_price as Stripe.Price
    const convertedPrice = (price.unit_amount! / 100).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
    })

    return res.status(200).json({
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        convertedPrice: convertedPrice,
        defaultPrice: price.unit_amount! / 100,
        defaultPriceId: price.id,
        description: product.description,
    })
}