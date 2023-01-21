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
          value: "<@&1066025445692284999>",
        },
        {
          name: "sed",
          value: "<@&1066025577158557736>",
        },
        {
          name: "ard",
          value: "<@&1066025709409144893>",
        },
        {
          name: "harzmat",
          value: "<@&1066025755705888829>",
        },
        {
          name: "joint",
          value: "<@&1066025445692284999> <@&1066025577158557736> <@&1066025709409144893> <@&1066025755705888829>",
        },
      )
  )
  .addStringOption((option) =>
    option
      .setName("time")
      .setDescription("Hour of the incident")
      .setRequired(true)
  )
  .addStringOption((option) =>
  option
    .setName("incident")
    .setDescription("Description of the incident")
    .setRequired(true)
);

export default pagerCommand.toJSON();
