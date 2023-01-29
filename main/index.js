import { config } from "dotenv";
config();
import * as fs from 'fs';
import orderCommand from "./commands/order.js";
import pagerCommand from "./commands/pager.js";
import buttonCommand from "./commands/button.js";
import pingCommand from "./commands/ping.js";
import pagerID from "./config.json" assert {type: "json"};
import {
  ActionRowBuilder,
  Client,
  Collection,
  Partials,
  GatewayIntentBits,
  InteractionType,
  ModalBuilder,
  Routes,
  ButtonBuilder,
  PermissionsBitField,
  TextInputStyle,
  RPCCloseEventCodes,
  ActivityType,
  messageLink,
  ApplicationCommandOptionWithChoicesAndAutocompleteMixin,
} from "discord.js";
import { REST } from "@discordjs/rest";
import { mongoose } from "mongoose";
import * as path from "path";
import { domainToASCII } from "url";

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const MONGO_DB = process.env.MONGO_DB;

const rest = new REST({
  version: "10",
}).setToken(TOKEN);

/*mongoose.set('strictQuery', false);
mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => [
  console.log('Connected to MongoDB')
]).catch((err) => {
  console.log(err)
})*/


let data = await JSON.parse(fs.readFileSync('./config.json', 'utf-8'));




const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  allowedMentions: { parse: ["users", "roles"], repliedUser: true },
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('over Los Suenos', { type: ActivityType.Watching});
  client.user.setStatus('dnd');
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === "order") {
      interaction.reply({
        content:
          "*Your ordered:* **" + interaction.options.get("food").value + "**",
      });
    } else if (interaction.commandName === "ping" && interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      interaction.reply({content: `Pong! ${client.ws.ping}ms`, fetchReply: true})
      .then(msg => {
        msg.react('🏓')
      })
    
    }else if (interaction.commandName === "pager") {
      if (
        interaction.member.roles.cache.some(
          (role) => role.name === "Supervisory Staff" || interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) || role.name === 'DOJ' || role.name === 'Command Staff'
        )
      ) {

        
        const team = interaction.options.get("team").value;
        const incident = interaction.options.get("incident").value;
        const time = interaction.options.get("time").value;
        const user = interaction.user;
        await interaction.reply({
          content: `**PAGER — PAGER — PAGER**
**NO:** ${data.id}
**FROM:**  <@${user.id}>
**TO:** ${team}
**INCIDENT:** ${incident}
**TIME:** ${time}
**PAGER — PAGER — PAGER**`, fetchReply: true
        })
        .then(msg => {
          msg.react('✅')
          msg.react('❌')
        })
        data.id++
        fs.writeFileSync('./config.json', JSON.stringify(data));
      }
      else{
      await interaction.reply({
        content: `You do not have permission to use this command!`,
      })
      await interaction.fetchReply()
      .then(msg => {
        setTimeout(() => msg.delete(), 2000);
      });
    }
    } else if (interaction.isButton()) {
      console.log(interaction);
      interaction.reply({ content: "Thanks for clicking on the button!" });
    } else if (interaction.commandName === "button") {
      const user = interaction.user;
      await interaction.reply({
        content: `BUTTON TEST`,
        components: [
          new ActionRowBuilder().setComponents(
            new ButtonBuilder()
              .setCustomId("button1")
              .setLabel("Button 1")
              .setStyle("Primary")
          ),
        ],
      });
    } else if (interaction.customId == "button1") {
      interaction.deferReply({ content: "Thanks for clicking on the button!" });
    }
  }
});

async function main() {
  const commands = [orderCommand, pagerCommand, buttonCommand, pingCommand];
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    client.login(TOKEN);
  } catch (err) {
    console.log(err);
  }
}

main();
