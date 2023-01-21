import { SlashCommandBuilder } from 'discord.js';

const orderCommand = new SlashCommandBuilder()
    .setName('button')
    .setDescription('Button test');

export default orderCommand.toJSON();