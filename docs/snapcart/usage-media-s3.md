# Media - Setup Amazon S3

Store your media files on Amazon S3 for better performance and scalability.

## Prerequisites

- An AWS account
- An S3 bucket created
- IAM user with S3 access permissions

## Configuration

1. In admin panel, go to `Settings` -> `Media`
2. Select **Amazon S3** as the storage driver
3. Fill in the credentials:

- **AWS Access Key ID**: Your IAM user access key
- **AWS Secret Access Key**: Your IAM user secret key
- **AWS Region**: The region of your S3 bucket (e.g., `us-east-1`)
- **Bucket Name**: Your S3 bucket name
- **URL**: (Optional) Custom CDN URL

4. Click `Save`

::: warning
Make sure your S3 bucket has proper CORS configuration if you need direct browser uploads.
:::

::: tip
Use CloudFront as a CDN in front of S3 for faster media delivery to your mobile customers worldwide.
:::
