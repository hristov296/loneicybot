const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ points: {} }).write();

let points = db.get('points').value();
console.log(points);

const TwitchBot = require('twitch-bot');
const pass = 's9cm3xf00umuna6en3xp3c0guhvq09';

const Bot = new TwitchBot({
  username: 'loneicybot',
  oauth: 'oauth:qfyf9bozkc2gi67n9ws98xr63zbexe',
  channels: ['exc3ssive29']
})

Bot.on('join', channel => {
  console.log(`Joined channel: ${channel}`)
})
 
Bot.on('error', err => {
  console.log(err)
})

Bot.on('message', chatter => {
  points[chatter]

  if(chatter.message === '!test') {
    Bot.say('Command executed! PogChamp')
  }
})

