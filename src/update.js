const path = require("path");
const fetch = require("node-fetch");
const fs = require("fs");

let stars = 0,
  page = 1;

let special;

const CountStars = async () => {
  let StarsData = await fetch(
    `https://api.github.com/users/AnuPlayz/starred?per_page=100&page=${page}`
  ).then((res) => res.json());
  stars += StarsData.length;
  page++;
  if (StarsData.length === 100) CountStars();
  else WriteReadMe();
};

const WriteReadMe = async () => {
  //Get ReadMe path
  const ReadMe = path.join(__dirname, "..", "README.md");
  const date = new Date();
  
  //Season Based Emoji
  let dd = date.getDate(), mm = date.getMonth() + 1
  
  if(mm === 12)special = ["⛄", "❄", "🎄"]
  else if(mm === 9 && dd === 29) special = ["🎉", "🎈", "🎊"]

  //Fetching Info From Github API
  let UserData = await fetch("https://api.github.com/users/AnuPlayz").then(
    (res) => res.json()
  );

  //Creating the text what we gonna save on ReadMe file
  const text = `## Hi there 👋 <img align="right" src="https://avatars.githubusercontent.com/u/120038186?v=4" width="200" />
  I'm **Aniruddh**, An developer from somewhere in the earth. I like to code web applications and games. I have worked on many projects in my past, Some of my open source projects are pinned below make sure to check them out.
  
  My skill set encompasses a breadth of technologies, including TypeScript, JavaScript, API development, both Backend and Frontend proficiency, and a holistic command of Full Stack development. I leverage Prisma and Express for robust backend architecture, while employing Next.js with TypeScript for Full Stack applications and Node.js for backend implementations. Additionally, my expertise extends to the intricate domains of Discord bot development, Blockchain, Web3, and DApps, reflecting a commitment to staying at the forefront of technological advancements.
    
  Thanks for visiting my github profile. Have a great day ahead!~
    
  <h2 align="center"> ✨ About Me ✨</h2>
  
  \`\`\`js
  const Aniruddh = {
      FavouriteLanguage: "Javascript/Typescript",
      OpenedIssues: 79,
      OpenedPullRequests: 71,
      TotalCommits: 1069,
      Stars: 10,
      Repositories: {
         Created: 198,
         Contributed: 13
      },
  }; //I'm a Epic Object, UwU
  \`\`\`
    
  <h2 align="center"> 🚀 My Stats 🚀</h2>
  <p align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=AnuPlayz&theme=tokyonight">
  </p>
  <details>
    <summary>
        Even more stats
    </summary>
    <p align="center">
      <img src="https://github-profile-trophy.vercel.app/?username=AnuPlayz&theme=dracula">
      <img src="https://github-readme-stats.vercel.app/api?username=AnuPlayz&theme=tokyonight&count_private=true&show_icons=true&include_all_commits=true">
    </p>
  </details>
  
<!-- Last updated on ${date.toString()} ;-;-->
<i>Last updated on ${date.getDate()}${
    date.getDate() === 1
      ? "st"
      : date.getDate() === 2
      ? "nd"
      : date.getDate() === 3
      ? "rd"
      : "th"
  } ${
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][date.getMonth()]
  } ${date.getFullYear()} using magic</i> ${special?special[2]:"✨"} ${(mm === 9 && dd === 29)?"and... today is my birthday":""}`;

  //Saving on readme.md
  fs.writeFileSync(ReadMe, text);
};

(() => {
    CountStars();
})()
