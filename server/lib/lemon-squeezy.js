const lmCheckoutUrl = 'https://api.lemonsqueezy.com/v1/checkouts';

export const createCheckout = async (payload) => {
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
        return { success: false, errors: resData.errors }

    const url = resData?.data?.attributes?.url;
    return { success: true, data: { url } }
}