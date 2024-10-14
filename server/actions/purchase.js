'use server';

import { createOrder } from "../lib/order";
import { createCheckout } from "../lib/lemon-squeezy";
import { PRIMARY_COLOR_HEX } from "@/const/imagine-box-consts";
const price = 19.97;

export const createLicenseCheckout = async (userId) => {
    const orderRes = await createOrder(userId, price);

    const checkoutPayload = {
        data: {
            type: 'checkouts',
            attributes: {
                product_options: {
                    redirect_url: `${process.env.HOST_URL}/upgrade-wait`
                },
                checkout_options: {
                    button_color: PRIMARY_COLOR_HEX
                },
                checkout_data: {
                    custom: {
                        user_id: userId,
                        order_id: orderRes?.data?.id
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

    const checkoutRes = await createCheckout(checkoutPayload);
    if (!checkoutRes.success)
        return checkoutRes;

    return { success: true, data: { url: checkoutRes?.data?.url }}
}