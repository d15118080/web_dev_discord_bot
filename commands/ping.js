const { SlashCommandBuilder,EmbedBuilder } = require("discord.js");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("캐릭터")
    .setDescription("캐릭터의 정보를 출력합니다.")
    .addStringOption((option) =>
      option
        .setName("닉네임")
        .setDescription("정보를 가져올 캐릭터의 닉네임")
        .setRequired(true)
    ),
  run: async ({ interaction }) => {
    const nickName = interaction.options.get("닉네임").value;
    try {
      const html = await axios.get(`https://maple.gg/u/${nickName}`);
      const $ = cheerio.load(html.data);

      const levelAndClass = $("ul.user-summary-list").text();
      const level = levelAndClass.split("\n")[2].trimStart();
      const job = levelAndClass.split("\n")[3].trimStart();

      const charImg = $("img.character-image").attr("src");
      const serverImg = $("img.align-middle").attr("src");

      const embed = new EmbedBuilder()
        .addFields(
          {
            name: "레벨",
            value: `${level}`,
          },
          {
            name: "직업",
            value: `${job}`,
          }
        )
        .setThumbnail(`https:${serverImg}`)
        .setColor("White")
        .setAuthor({
          name: nickName,
          iconURL: charImg,
        });
      interaction.reply({ embeds: [embed] });
    } catch (error) {
      interaction.reply(`에러 발생! ${error}`);
    }
  },
};