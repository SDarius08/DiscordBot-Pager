import { config } from "dotenv";
config();
import orderCommand from "./commands/order.js";
import pagerCommand from "./commands/pager.js";
import buttonCommand from "./commands/button.js";
import {
  ActionRowBuilder,
  Client,
  Collection,
  Partials,
  GatewayIntentBits,
  InteractionType,
  ModalBuilder,
  Routes,
  SelectMenuBuilder,
  TextInputBuilder,
  ButtonStyle,
  ButtonBuilder,
  TextInputStyle,
} from "discord.js";
import { REST } from "@discordjs/rest";
import { mongoose } from "mongoose";
import * as path from "path";
import { domainToASCII } from "url";

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const rest = new REST({
  version: "10",
}).setToken(TOKEN);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  allowedMentions: { parse: ["users", "roles"], repliedUser: true },
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    status: "online",
    activities: [{
      name: "Watching",
      type: "Playing"
    }]
  })
});

client.on("interactionCreate", async interaction => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === "order") {
      interaction.reply({
        content:
          "*Your ordered:* **" + interaction.options.get("food").value + "**",
      });
    } else if (interaction.commandName === "pager") {
      const team = interaction.options.get("team").value;
      const incident = interaction.options.get("incident").value;
      const time = interaction.options.get("time").value;
      var i = 0;
      const user = interaction.user;
      await interaction.reply({
        content: `**PAGER — PAGER — PAGER**
**NO:** ${i++}
**FROM:**  <@${user.id}>
**TO:** ${team}
**INCIDENT:** ${incident}
**TIME:** ${time}
**PAGER — PAGER — PAGER**`,
      });
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
    } else if(interaction.customId == 'button1') {
      interaction.deferReply({ content: "Thanks for clicking on the button!" });
    }
    }
  },
);


async function main() {
  const commands = [orderCommand, pagerCommand, buttonCommand];
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
