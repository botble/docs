---
title: AWS SNS Driver
description: Set up SMS delivery through Amazon Simple Notification Service (SNS).
---

# AWS SNS Driver

Send SMS through Amazon SNS with tight integration for AWS-hosted applications.

## Get AWS credentials

1. Sign up for [AWS](https://aws.amazon.com/)
2. Go to **IAM → Users** and create a new user (or use existing)
3. Create an access key:
   - Go to **Security credentials** tab
   - Click **Create access key**
   - Copy your:
     - **Access Key ID**
     - **Secret Access Key**
4. Attach policy `AmazonSNSFullAccess` to the user


## Configure in Botble

1. Go to **Admin → Settings → SMS Gateways**
2. Check **AWS SNS** under **Active Drivers**
3. Expand the **AWS SNS** section and enter:
   - **Access Key ID**: Your AWS Access Key ID
   - **Secret Access Key**: Your AWS Secret Access Key
   - **Region**: AWS region (e.g., `us-east-1`, `eu-west-1`)
   - **Sender ID**: Optional alphanumeric sender ID
4. Click **Test SMS** to verify credentials
5. Click **Save**


## Enable SMS in your AWS region

SMS is not enabled by default in all AWS regions. To enable:

1. Go to **AWS SNS Console → SMS**
2. Select your **Region** (top-right corner)
3. Click **Edit SMS attributes**
4. Set **Default SMS Type** to "Transactional"
5. Optionally request increased SMS limits
6. Save

## Test the connection

1. Click **Send test SMS** in the AWS SNS settings tab
2. Enter your personal phone number (with country code, e.g., `+1-555-5678`)
3. Click **Send**
4. You should receive an SMS within 10 seconds

## SMS costs

AWS SNS charges per SMS sent:

- **USA**: $0.00645 per SMS (outbound)
- **International**: $0.01–$0.25+ per SMS depending on destination

No setup fees or minimums; pay only for SMS sent.

## Sandbox mode

AWS SNS SMS starts in **Sandbox mode**, which restricts:

- Only SMS to verified phone numbers
- Max 200 SMS/month

To lift restrictions, submit an SNS SMS Sandbox Removal Request in the AWS Support Console.

## Region selection

SMS availability varies by region:

- **us-east-1**: Full support (recommended)
- **eu-west-1**: Full support
- **ap-southeast-1**: Full support

Check [AWS SNS SMS regions](https://docs.aws.amazon.com/sns/latest/dg/sms_supported_countries.html) for your country.

## Troubleshooting

### "Invalid credentials" error

1. Double-check Access Key ID and Secret Access Key
2. Verify the IAM user has `AmazonSNSFullAccess` policy
3. Ensure the region is correct and SMS is enabled there
4. Check if the access key has expired (regenerate if needed)

### SMS not delivered

1. Verify phone number format (must include country code)
2. Check if your account is in SMS Sandbox (see above)
3. Verify recipient phone is in a supported country
4. Check AWS SNS Console → Message logs for delivery status

### "SMS is not available in this region" error

1. Go to AWS SNS Console → SMS and enable SMS for your region
2. Select a region that supports SMS (us-east-1 is safest)
3. Submit a Sandbox Removal Request if needed

## Next step

See [Configuration](../configuration.md) to activate additional drivers or [Plivo](./plivo.md) for alternative providers.
