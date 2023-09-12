# Simple JS Pastebin

World's simplest (probably) pastebin service!

- Runs off a simple ExpressJS server, no config required
- Data is storred locally - No external services required
- Data is E2E encrypted
- Licensed under WTFPL - You are free to do anything you want!

## Installation
- Clone this repository
- install dependencies with `npm i` or equivalent command for your specific package manager

## Running
- I recommend using PM2, a robust process manager, to run your pastebin!

### Steps
- Install pm2 with `npm i pm2 --save` (or equivalent command for your specific package manager)
- Change the port and Base URL to your liking by editing the `.env.example` file
- Rename that file to `.env`
- run `pm2 start index.js`

Your service should now be up and running!

## Deploying to the public
- Do not just port forward the webapp on your server, that'll expose your server IP and be very insecure.
- I recommend using [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/), as it provides a simple, secure way to expose your webapps with very little configuration.

## API
This pastebin provides a very simple API to make new pasted remotely.

### POST `url://encrypt/`
Query Params: data = the text you want to paste

Response: the paste URL with key