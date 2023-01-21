import { SlashCommandBuilder } from 'discord.js';

const orderCommand = new SlashCommandBuilder()
    .setName("order")
    .setDescription("Order food")
    .addStringOption((option) =>
      option
        .setName("food")
        .setDescription("Select your food")
        .setRequired(true)
        .setChoices(
            {
                name: 'Cake',
                value: 'cake',
            },
            {
                name: 'Hamburger',
                value: 'hamburger',
            }
        )
    );

export default orderCommand.toJSON();