const tmi = require("tmi.js");
const has = require("has");
// const db = require("./db.js");

// let points = db.get("points").value();
// let users = [];

const Channel = require("./models/Channel");
const channels = Channel.find();
console.log(channels);
// const { username, oauth, hour_rate, msg_rate } = require("./config/config");

// let options = {
//   options: {
//     debug: true,
//   },
//   connection: {
//     reconnect: true,
//     secure: true,
//   },
//   identity: {
//     username: username,
//     password: oauth,
//   },
//   channels: [`#${channel}`],
// };

// const client = new tmi.client(options);

// client.on("connected", (addr, port) => {
//   console.log(`* Connected to ${addr}:${port}`);
// });

// client.on("join", (channel, username, self) => {
//   console.log(`${username} has joined`);

//   if (!users.includes(username)) {
//     users.push(username);
//   }
// });

// client.on("part", (channel, username, self) => {
//   console.log(`${username} has left`);

//   if (users.includes(username)) {
//     users = users.filter(item => {
//       return item !== username;
//     });
//   }
// });

// client.on("message", (target, context, msg, self) => {
//   if (self) {
//     return;
//   } // Ignore messages from the bot

//   if (has(points, context.username)) {
//     points[context.username] += msg_rate;
//   } else {
//     points[context.username] = msg_rate;
//   }

//   // Remove whitespace from chat message
//   const commandName = msg.trim();

//   // If the command is known, let's execute it
//   if (commandName === "!dice") {
//     const num = 3.5;
//     client.say(target, `You rolled a ${num}`);
//     console.log(`* Executed ${commandName} command`);
//   }
// });

// setInterval(() => {
//   users.forEach((el, i) => {
//     if (has(points, el)) {
//       points[el] += hour_rate;
//     } else {
//       points[el] = hour_rate;
//     }
//   });

//   db.update("points", points).write();
//   console.log("Updated DB after 1 min");
// }, 1000 * 60);

// client.connect();
