import fs from 'fs';
import path from 'path';
import {
  Client,
  ClientOptions,
  Collection,
  CommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

export class ClientWithCommands extends Client {
  commands: Collection<string, Command>;
  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
  }
}

export interface Command {
  data: SlashCommandBuilder,
  execute(interaction: CommandInteraction): Promise<void>,
}

export async function buildCommandsCollection(): Promise<Command[]> {
  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
  const commands: Command[] = [];
  for (const file of commandFiles) {
    // this is the command class definition, not a command
    if (file == "command.ts") continue;

    const filePath = path.join(commandsPath, file);
    // const command = require(filePath);
    const importedModule = await import(filePath);
    const command = importedModule.default;
    commands.push(command);
  }
  return commands;
}
export async function buildCommandsJsonCollection(): Promise<String[]> {
  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
  const commands: String[] = [];
  for (const file of commandFiles) {
    // this is the command class definition, not a command
    if (file == "command.ts") continue;

    const filePath = path.join(commandsPath, file);
    // const command = require(filePath);
    const importedModule = await import(filePath);
    const command = importedModule.default;
    commands.push(command.data.toJSON());
  }
  return commands;
}
