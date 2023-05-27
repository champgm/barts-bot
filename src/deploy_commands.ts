import { REST, Routes } from 'discord.js';
import { configuration } from './configuration';
import { buildCommandsJsonCollection } from "./commands_builder";

const rest = new REST().setToken(configuration.bot.token);

export async function deployCommands() {
  const commands = await buildCommandsJsonCollection();
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data: any = await rest.put(
      Routes.applicationCommands(configuration.bot.clientId),
      { body: commands },
    );

    console.log(`Successfully reloaded application (/) commands: ${JSON.stringify(data, null, 2)}`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
}
