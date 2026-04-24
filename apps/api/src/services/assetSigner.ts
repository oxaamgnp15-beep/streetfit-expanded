import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
const s3 = new S3Client({
  region: process.env.ASSET_S3_REGION,
  forcePathStyle: true,
  endpoint: process.env.ASSET_S3_ENDPOINT,
  credentials: { accessKeyId: process.env.ASSET_S3_ACCESS_KEY!, secretAccessKey: process.env.ASSET_S3_SECRET_KEY! }
});
export async function signAsset(path: string, ttlSec = 3600) {
  return await getSignedUrl(s3, new GetObjectCommand({ Bucket: process.env.ASSET_BUCKET!, Key: path }), { expiresIn: ttlSec });
}
