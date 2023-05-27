# barts-bot


## Prerequisites
* Chocolatey: https://chocolatey.org/
* NVM: `choco install nvm`
* git: `choco install git`


## Configuration Steps

1. Make a bot: https://discord.com/developers/applications/
  * Detailed info here: https://discordjs.guide/preparations/adding-your-bot-to-servers.html
2. Make a server using the discord client.
3. Add your bot to a server.
  * Detailed info here: https://discordjs.guide/preparations/adding-your-bot-to-servers.html
4. Copy `src/configuration_example.ts` to `src/configuration.ts`
5. Fill out `src/configuration.ts` with various values (see file for details)

## New Commands

Ideally, you should just need to copy what's in `src/commands/ping.ts` and tweak it to do what you want... Good luck.

## 
