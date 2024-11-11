import { LemonCheckoutInput } from '@/types/lemon-squeezy-input';
import { ApiResponse, ResponseFactory } from '@/types/response'

const lmCheckoutUrl = 'https://api.lemonsqueezy.com/v1/checkouts';

export const createCheckout = async (payload: LemonCheckoutInput) : Promise<ApiResponse<{url: string}>> => {
    const response = await fetch(lmCheckoutUrl, {
        body: JSON.stringify(payload),
        method: 'POST',
        headers: {
            'Content-Type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json',
            'Authorization': `Bearer ${process.env.LM_API_KEY}`
        }
    })

    const resData = await response.json();

    if (resData.errors)
        return ResponseFactory.fail({ message: "Creating checkout failed", data: resData.errors})

    const url = resData?.data?.attributes?.url;
    return { success: true, data: { url } }
}