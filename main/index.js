import { config } from "dotenv";
config();
import orderCommand from "./commands/order.js";
import pagerCommand from "./commands/pager.js";
import {
  ActionRowBuilder,
  Client,
  GatewayIntentBits,
  InteractionType,
  ModalBuilder,
  Routes,
  SelectMenuBuilder,
  TextInputBuilder,
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
  intents: [GatewayIntentBits.Guilds],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on("interactionCreate", (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === "order") {
    interaction.reply({
      content:
        "*Your ordered:* **" + interaction.options.get("food").value + "**",
    });

} else if (interaction.commandName === "pager") {
    const team = interaction.options.get("team").value
    const incident = interaction.options.get("incident").value
    const time = interaction.options.get("time").value
    var i = 0;
    const user = interaction.user
        interaction.reply({
          content:
            `**PAGER — PAGER — PAGER**
**NO:** ${i++}
**FROM:**  <@${user.id}>
**TO:** ${team}
**INCIDENT:** ${incident}
**TIME:** ${time}
**PAGER — PAGER — PAGER**`,
        })};
  };
});

async function main() {
  const commands = [orderCommand,pagerCommand];
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
