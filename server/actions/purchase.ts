'use server';

import { createOrder } from "../lib/order";
import { createCheckout } from "../lib/lemon-squeezy";
import { PRIMARY_COLOR_HEX } from "@/const/consts";
import { UserTier } from "@prisma/client";
import { LemonCheckoutInput } from "@/types/lemon-squeezy-input";
import { ApiResponse, ResponseFactory } from "@/types/response";
import { getCurrentUser } from "./users";

const price = 19.97;

export const createLicenseCheckout = async (userId: string) : Promise<ApiResponse<{url: string}>> => {
    const user = await getCurrentUser();

    if (!user) {
        return ResponseFactory.fail({ message: 'User not found' })
    }

    if (user.tier === UserTier.PAID) {
        return ResponseFactory.fail({ message: 'User already has a license' })
    }

    const orderRes = await createOrder(userId, price);

    const checkoutPayload: LemonCheckoutInput = {
        data: {
            type: 'checkouts',
            attributes: {
                product_options: {
                    redirect_url: `${process.env.HOST_URL}/upgrade-wait?orderId=${orderRes?.data?.id}`
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
                        id: process.env.LM_LICENSE_VARIANT_ID,
                    }
                }
            }
        }
    }

    const checkoutRes = await createCheckout(checkoutPayload);
    if (!checkoutRes.success)
        return checkoutRes;

    if (!checkoutRes?.data?.url)
        return ResponseFactory.fail({})

    return ResponseFactory.success({ data: { url: checkoutRes?.data?.url }})
}