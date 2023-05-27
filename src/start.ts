import { Events, GatewayIntentBits } from 'discord.js';
import { configuration } from './configuration';
import { ClientWithCommands, buildCommandsCollection } from './commands_builder';
import { handleSlashCommand } from './slash_command_handler';
import { deployCommands } from './deploy_commands'

// Create a new client instance
const client: ClientWithCommands = new ClientWithCommands({ intents: [GatewayIntentBits.Guilds] });

// Build and assign a collection of the existing slash commands
buildCommandsCollection().then((commandCollection) => {
  console.log(`Configuring slash commands...`);
  console.log(`Commands to configure: ${JSON.stringify(commandCollection, null, 2)}`);
  for (const command of commandCollection) {
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command ${JSON.stringify(command)} is missing a required "data" or "execute" property.`);
    }
  }
  console.log(`${commandCollection.length} Slash commands have been configured.`);
});

// Assign a handler that will handle slash commands
client.on(Events.InteractionCreate, handleSlashCommand);

// Log in to Discord with your client's token
client.login(configuration.bot.token)
  .then(async (aString) => {
    console.log('Login finished.');
    console.log(`Deploying commands...`);
    await deployCommands();
  })
  .catch((error) => {
    console.log(`Login failed, error was: ${error}`);
    console.log(`${JSON.stringify(error, null, 2)}`);
  });
