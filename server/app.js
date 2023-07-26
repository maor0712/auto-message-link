const { Client, LocalAuth } = require('whatsapp-web.js');
const cron = require('node-cron');
const array = require('./links');

//authenticationc
const client = new Client({
    puppeteer: {
      executablePath: '/usr/bin/brave-browser-stable',
    },
    authStrategy: new LocalAuth({
      clientId: "client-one"
    }),
    puppeteer: {
      headless: false,
    }
  });



client.on('authenticated', (session) => {
    console.log('WHATSAPP WEB => Authenticated');
  });

let date;
let day;
let mounth;
let link;
client.on('ready', () => {
    console.log('Client is ready!');





    cron.schedule('55 16 * * 1,4',() => {
        console.log('running at 16:30 on Monday and Thursday');
        date = new Date();
        day = date.getDate();
        mounth = date.getMonth()+1;
        
        for(let i=0; i < array.linksArray.length; i ++){
            if(`${day}/${mounth}` === array.linksArray[i].date){
                link = array.linksArray[i].link;
            }
        
        }
           client.getChats().then((chat)=>{
                const myGroup = chat.find((chat) => chat.name === '[name of the chat]');    
                client.sendMessage(myGroup.id._serialized,`Congratulations! You have reached the final lesson of the course. I was happy to serve you and send you the link despite your complaints every time I took a break. So here is the final link of the course, and I don't want to hear from you anymore
                ${link}`)
            })
          });
});



client.initialize();


