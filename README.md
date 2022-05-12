# The Demo Conversations App

This is a lightweight application based on [Twilio Conversations](https://www.twilio.com/docs/conversations).

# Configuring and getting started

This demo requires a Twilio account and a working Conversations Service SID.
You'll need to collect some credentials from the [Twilio Console](https://www.twilio.com/console):

- Your Account SID (`ACXXX`), Auth Token, API Key and API Secret, all accessible from the [Dashboard](https://twilio.com/console/dashboard)
- Your Account's Conversations Service Sid `ISXXX` SID which is attached to your Conversations Service

# Testing

The demo application can be configured as such:

- Cloning this repo and running locally
  - Remember to copy the `.env.example` file to `.env` and replace the variables values with
    the ones from your account. By default `NODE_ENV` is set to `production`.
