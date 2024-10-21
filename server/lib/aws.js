import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

export const uploadFileToS3AndGetUrl = async (bucketName, genId, file) => {
    try {
        const fileName = `${genId}/${uuidv4()}`;
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            Body: file,
            ContentType: file.type,
        });

        const res = await s3Client.send(command);

        if (res.$metadata.httpStatusCode !== 200) {
            return { success: false, message: "Failed to upload file" };
        }

        return { success: true, data: `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}` };

    } catch (error) {
        return { success: false, message: error.message };
    }
}