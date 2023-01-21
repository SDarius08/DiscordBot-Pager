import { SlashCommandBuilder } from "discord.js";

const pagerCommand = new SlashCommandBuilder()
  .setName("pager")
  .setDescription("set a pager")
  .addStringOption((option) =>
    option
      .setName("team")
      .setDescription("Team to dispatch")
      .setRequired(true)
      .setChoices(
        {
          name: "swt",
          value: "swt",
        },
        {
          name: "sed",
          value: "sed",
        },
        {
          name: "ard",
          value: "ard",
        },
        {
          name: "harzmat",
          value: "mazmat",
        },
        {
          name: "joint",
          value: "joint",
        },
      )
  )
  .addIntegerOption((option) =>
    option
      .setName("incident")
      .setDescription("Hour of the incident")
      .setRequired(true)
  );

export default pagerCommand.toJSON();
