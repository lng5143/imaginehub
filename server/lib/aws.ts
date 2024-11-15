import { ApiResponse, ResponseFactory } from "@/types/response";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { fromEnv } from '@aws-sdk/credential-provider-env'

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: fromEnv()
});

export const uploadFileToS3AndGetUrl = async (bucketName: string | undefined, genId: string, file: ArrayBuffer) : Promise<ApiResponse<string>> => {
    
    try {
        const fileName = `${genId}/${uuidv4()}`;
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            Body: Buffer.from(file)
            // ContentType: file.type,
        });

        const res = await s3Client.send(command);

        if (res.$metadata.httpStatusCode !== 200) {
            return ResponseFactory.fail({ message: "Failed to upload image" });
        }

        return ResponseFactory.success({ data:`https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`});
    } catch (error) {
        return ResponseFactory.fail({ message: "Failed to upload image" });
    }
}