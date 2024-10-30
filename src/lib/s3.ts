import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3"

const { S3_ACCESS_KEY, S3_ACCESS_SECRET, S3_NOTES_BUCKET, S3_URL } = process.env

const s3Client = new S3Client({
  endpoint: S3_URL!,
  forcePathStyle: true,
  region: process.env.S3_REGION! ?? "us-east-1",
  credentials: {
    accessKeyId: S3_ACCESS_KEY!,
    secretAccessKey: S3_ACCESS_SECRET!,
  },
})

const BUCKETNAME = S3_NOTES_BUCKET!

type NoteContentInBucket = {
  content: Record<string, unknown>
}

export async function uploadNoteContent(
  s3Key: string,
  content: NoteContentInBucket,
) {
  const command = new PutObjectCommand({
    Bucket: BUCKETNAME,
    Key: s3Key,
    Body: JSON.stringify(content),
    ContentType: "application/json",
    Metadata: {
      lastModified: new Date().toISOString(),
    },
  })

  try {
    await s3Client.send(command)
  } catch (error) {
    console.error(`Error uploading note with key ${s3Key} to S3:`, error)
    throw new Error("Failed to save note")
  }
}

export async function getNoteContent(
  s3Key: string,
): Promise<NoteContentInBucket> {
  const command = new GetObjectCommand({
    Bucket: BUCKETNAME,
    Key: s3Key,
  })

  try {
    const response = await s3Client.send(command)
    const bodyContents = await response.Body?.transformToString()
    if (!bodyContents) throw new Error("No content found")
    return JSON.parse(bodyContents)
  } catch (error) {
    console.error("Error reading from S3:", error)
    throw new Error("Failed to read note content")
  }
}
