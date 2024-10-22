export const SD_PRESETS = ["3d-model", "analog-film", "anime", "cinematic", "comic-book", "digital-art", "enhance", "fantasy-art", "isometric", "line-art", "low-poly", "modeling-compound", "neon-punk", "origami", "photographic", "pixel-art", "tile-texture"]
export const SD_RATIOS = ["1:1", "2:3", "3:2", "4:5", "5:4", "9:16", "9:21", "16:9", "21:9"]
export const SD3_MODELS = ["sd3-large", "sd3-turbo", "sd3-medium"]
export const DE2_SIZES = ["256x256", "512x512", "1024x1024"];
export const DE3_SIZES = ["1024x1024", "1024x1792", "1792x1024"];
export const DE3_QUALITIES = ["standard", "hd"];
export const DE2_QUALITIES = ["standard"];
export const MODELS = [
    {
        code: "de-2",
        provider: "openai",
        name: "DALL-E 2",
    },
    {
        code: "de-3",
        provider: "openai",
        name: "DALL-E 3",
    },
    {
        code: "sd3-medium",
        provider: "stability",
        name: "Stable Diffusion 3 Medium",
    },
    {
        code: "sd3-large",
        provider: "stability",
        name: "Stable Diffusion 3 Large",
    },
    {
        code: "sd3-large-turbo",
        provider: "stability",
        name: "Stable Diffusion 3 Turbo",
    },
    {
        code: "si-core",
        provider: "stability",
        name: "Stable Image Core",
    },
    {
        code: "si-ultra",
        provider: "stability",
        name: "Stable Image Ultra",
    }
]

export const IMAGE_BUCKET_NAME = "generated-images";

export const PAGE_SIZE = 24;
export const IMAGINEBOX_OTP_PRICE_ID = "pri_01j9dsw6nd5wwh39bcgse1gsqt";
export const CONTACT_EMAIL = "support@imaginebox.me";
export const TRIAL_IMAGE_COUNT = 20;
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
}

export const BLOG_PAGE_SIZE = 9;