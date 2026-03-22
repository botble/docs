# Media - Setup Wasabi

Store media files on Wasabi cloud storage, an S3-compatible storage service with no egress fees.

## Prerequisites

- A Wasabi account
- A storage bucket created

## Configuration

1. In admin panel, go to `Settings` -> `Media`
2. Select **Wasabi** as the storage driver
3. Fill in the credentials:

- **Access Key**: Your Wasabi access key
- **Secret Key**: Your Wasabi secret key
- **Region**: Bucket region (e.g., `us-east-1`)
- **Bucket Name**: Your Wasabi bucket name

4. Click `Save`

::: tip
Wasabi's no-egress-fee pricing makes it cost-effective for stores with high traffic and many product images.
:::
