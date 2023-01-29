import { SlashCommandBuilder } from 'discord.js'

const pingCommand = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

export default pingCommand.toJSON();