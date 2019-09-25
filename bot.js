const tmi = require("tmi.js");
const has = require("has");

const Channel = require("./models/Channel");
const Chatter = require("./models/Chatter");

// let points = db.get("points").value();
// let users = [];

const { TW_USERNAME, TW_OAUTH } = process.env;
const channels = Channel.find({}, (err, docs) => {
  if (err) throw err;
  // console.log(docs);
});

let options = {
  options: {
    debug: true,
  },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: TW_USERNAME,
    password: TW_OAUTH,
  },
  channels: channels.map(el => `#${el.name}`),
};
const client = new tmi.client();
// const client = new tmi.client(options);

client.on("connected", (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);
});

client.on("join", (channel, username, self) => {
  console.log(`${username} has joined`);

  if (!users.includes(username)) {
    users.push(username);
  }
});

client.on("part", (channel, username, self) => {
  console.log(`${username} has left`);

  if (users.includes(username)) {
    users = users.filter(item => {
      return item !== username;
    });
  }
});

client.on("message", (target, context, msg, self) => {
  if (self) {
    return;
  } // Ignore messages from the bot

  if (has(points, context.username)) {
    points[context.username] += msg_rate;
  } else {
    points[context.username] = msg_rate;
  }

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === "!dice") {
    const num = 3.5;
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  }
});

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

const startBot = () => {
  client.connect();
};
const stopBot = () => {
  client.disconnect();
};
const joinChannel = channel => {
  client.join(channel);
};
const partChannel = channel => {
  client.part(channel);
};

module.exports = { startBot, stopBot, joinChannel, partChannel };
