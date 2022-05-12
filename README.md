<h1 align="center">Chat Conversations API Client</h1>

<div align="center">

[![Netlify Status](https://api.netlify.com/api/v1/badges/a673d18c-0e51-4428-bd2b-dc80ebf9987e/deploy-status)](https://app.netlify.com/sites/whimsical-cannoli-b5b8ee/deploys)

</div>

<br/>

This is a lightweight application based on [Twilio Conversations](https://www.twilio.com/docs/conversations).

# Live Website

Test it live on this [website](https://whimsical-cannoli-b5b8ee.netlify.app/)

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
