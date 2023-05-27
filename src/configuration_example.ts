/**
 * This file is `src\configuration_example.ts`
 * Copy-paste this file to `src\configuration.ts`
 * Then fill it out with real values to use your own bot/servers
 */
export class Configuration {
  bot: {
    clientId: string,
    token: string,
  } = {
      clientId: '',
      token: '',
    };
}

export const configuration: Configuration = {
  bot: {
    clientId: 'Get from https://discord.com/developers/applications',
    token: 'Get from: https://discord.com/developers/applications/{clientId}/bot',
  },
}
