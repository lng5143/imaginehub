export interface LemonCheckoutInput {
    data: {
        type: 'checkouts';
        attributes: {
            product_options: {
                redirect_url: string;
            };
            checkout_options?: {
                button_color: string | undefined;
            };
            checkout_data: {
                custom: {
                    user_id: string;
                    order_id: string;
                };
            };
        };
        relationships: {
            store: {
                data: {
                    type: 'stores';
                    id: string | undefined;
                };
            };
            variant: {
                data: {
                    type: 'variants';
                    id: string | undefined;
                };
            };
        };
    };
}
