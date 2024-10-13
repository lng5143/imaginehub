'use server';

import { createOrder } from "../lib/order";
import { createCheckout } from "../lib/lemon-squeezy";
import { PRIMARY_COLOR_HEX } from "@/const/imagine-box-consts";
const price = 19.97;

export const createLicenseCheckout = async (userId) => {
    const order = await createOrder(userId, price);

    const checkoutPayload = {
        data: {
            type: 'checkouts',
            attributes: {
                checkout_options: {
                    button_color: PRIMARY_COLOR_HEX
                },
                checkout_data: {
                    custom: {
                        user_id: userId,
                        order_id: order?.id
                    }
                }
            },
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
                        id: process.env.LM_LICENSE_VARIANT_ID
                    }
                }
            }
        }
    }

    const checkout = await createCheckout(checkoutPayload);
    if (!checkout.success)
        return checkout;

    return { success: true, data: { url: checkout?.data?.attributes?.url }}
}