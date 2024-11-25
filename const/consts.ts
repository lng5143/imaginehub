export const SD_PRESETS = ["3d-model", "analog-film", "anime", "cinematic", "comic-book", "digital-art", "enhance", "fantasy-art", "isometric", "line-art", "low-poly", "modeling-compound", "neon-punk", "origami", "photographic", "pixel-art", "tile-texture"]
export const SD_RATIOS = ["1:1", "2:3", "3:2", "4:5", "5:4", "9:16", "9:21", "16:9", "21:9"]
export const DE2_SIZES = ["256x256", "512x512", "1024x1024"];
export const DE3_SIZES = ["1024x1024", "1024x1792", "1792x1024"];
export const DE3_QUALITIES = ["standard", "hd"];

// TODO: determine if IMAGE_BUCKET_NAME, IMAGINEBOX_OTP_PRICE_ID should be env var
export const IMAGE_BUCKET_NAME = "generated-images";

export const PAGE_SIZE = 24;
export const IMAGINEBOX_OTP_PRICE_ID = "pri_01j9dsw6nd5wwh39bcgse1gsqt";
export const CONTACT_EMAIL = "admin@imaginebox.me";
export const TRIAL_IMAGE_COUNT = 10;
export const PRIMARY_COLOR_HEX = '#1e1b4b';
export const PAYMENT_UPDATES_STATUS = {
    loading: 'loading',
    failed: 'failed',
    success: 'success',
    timeOut: 'timeOut'
}

export const HINTS = {
    PROMPT: `Description of what you want to generate. \nEg. "A photograph of a white Siamese cat"`,
    DE_SIZE: `The size of the image to generate. \nDall-E 3 supports 1024x1024, 1024x1792, and 1792x1024. Dall-E 2 only supports 256x256, 512x512, and 1024x1024.`,
    DE_QUALITY: `HD is only supported on Dall-E 3.`,
    DE_SAMPLES: `The number of images to generate. From 1 to 10. Only supported on DALL-E 2`,
    SD_PRESETS: `Style preset to use for generation. Only available for Stable Image Core.`,
    SD_RATIOS: `Aspect ratio of the image to generate.`,
    SD_SEED: `A specific value that is used to guide the 'randomness' of the generation: [0 .. 4294967294]`,
    SD_NEGATIVE_PROMPT: `Description of what you don't want to generate.`,
    FL_WIDTH: `Width of the generated image. Minimum 256, maximum 1024. Must be a multiple of 32.`,
    FL_HEIGHT: `Height of the generated image. Minimum 256, maximum 1024. Must be a multiple of 32.`,
    FL_SEED: `Optional seed for reproducibility. Must be an integer`,
    FL_UPSAMPLING: `Automatically modifies the prompt for more creative generation`,
    FL_SAFETY: `Tolerance level for input and output moderation. Between 0 and 6, 0 being most strict, 6 being least strict.`,
    FL_STEPS: `Number of diffusion steps.`,
    FL_GUIDANCE: `Controls the balance between adherence to the text prompt and image quality/diversity. Minimum 1.5, maximum 5. \nHigher values make the output more closely match the prompt.`,
    FL_INTERVAL: `Variance in possible outputs. Minimum 1, maximum 4. \nHigher value produces more dynamic or varied outputs.`,
    FL_RAW: `Generate less processed, more natural-looking images`
}

export const BLOG_PAGE_SIZE = 9;

export const WEBHOOK_EVENT_TYPE = {
    ORDER_CREATED: 'order_created'
}

export const LSConsts = {
    OPEN_AI_API_KEY: 'ib_openai_api_key',
    STABILITY_API_KEY: 'ib_stability_api_key',
    PENDING_GENERATIONS: 'ib-pending-generations'
}

export enum ERROR_TYPES {
    NO_API_KEY,
    INVALID_PROVIDER
}