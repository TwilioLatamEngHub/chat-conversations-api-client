<h1 align="center">Chat Conversations API Client</h1>

<div align="center">

[![Netlify Status](https://api.netlify.com/api/v1/badges/a673d18c-0e51-4428-bd2b-dc80ebf9987e/deploy-status)](https://app.netlify.com/sites/whimsical-cannoli-b5b8ee/deploys)

</div>

<br/>

This is a lightweight application based on [Twilio Conversations](https://www.twilio.com/docs/conversations).

# Live Website

Test it live on this [website](https://whimsical-cannoli-b5b8ee.netlify.app/)

# Disclaimer

**This software is to be considered "sample code", a Type B Deliverable, and is delivered "as-is" to the user. Twilio bears no responsibility to support the use or implementation of this software.**

# Configuring and getting started

This demo requires a Twilio account where you'll need to collect some credentials from the [Twilio Console](https://www.twilio.com/console):

- Your Account SID (`ACXXX`), Auth Token, API Key and API Secret, all accessible from the [Dashboard](https://twilio.com/console/dashboard)
- Optional: Your Account's Conversations Service Sid `ISXXX` SID which is attached to your Conversations Service

For the backend this app is using Twilio Serverless Functions. [Click here to check the repo.](https://github.com/TwilioLatamEngHub/chat-conversations-api-serverless)

# Testing

The demo application can be configured as such:

- Cloning this repo and running locally
  - Remember to copy the `.env.example` file to `.env` and replace the variables values with
    the ones from your account. By default `NODE_ENV` is set to `production`.
