import { Interaction } from 'discord.js'
import { ClientWithCommands, Command } from './commands_builder';


export async function handleSlashCommand(
  interaction: Interaction
) {
  // Make sure this is a chat command
  if (!interaction.isChatInputCommand()) return;

  // Make sure there is a matching command
  const client: ClientWithCommands = interaction.client as ClientWithCommands;
  const command: Command | undefined = client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  // Try to execute the command.
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  }
};

