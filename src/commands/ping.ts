import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import { Command } from '../commands_builder';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply('Pong!');
  },
};
export default command;

