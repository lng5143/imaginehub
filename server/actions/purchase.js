'use server';

import { createOrder } from "../lib/order";
import { createCheckout } from "../lib/lemon-squeezy";
const price = 19.97;

export const createLicenseCheckout = async (userId) => {
    const order = await createOrder(userId, price);

    const checkoutPayload = {
        type: 'checkout',
        attributes: {},
        relationships: {
            store: {
                data: {
                    type: 'stores',
                    id: process.env.LM_STORE_ID
                }
            },
            variant: {
                data: {
                    type: 'variants',
                    id: process.env.LM_LICENSE_PRODUCT_ID
                }
            }
        }
    }

    const checkoutData = await createCheckout(checkoutPayload);
    if (!checkoutData.success)
        return checkoutData;

    return { success: true, data: { url: checkoutData?.data?.attributes?.url }}
}