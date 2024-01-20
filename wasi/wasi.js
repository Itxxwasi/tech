*/ this code is copied from sohail md all cradit for him
*/



let {smd,smdJson,Config,prefix,lastMatch} = require("../lib")

smd({
    cmdname: "cricsrh",  
    alias:["match","cricket","update"],  
    desc: "Gets upcomming cricket Match List!",
    filename: __filename,
  },
  async(m,text) => {
    try{
  let data = await smdJson("https://api-smd.vercel.app/api/match")
  if(data && data.status && data.results && data.results[0]){
  let res = data.results, str = "",legth = parseInt(text) || 10
  let target = /all/gi.test(text) ? res.length : !isNaN(legth) && legth < res.length ? legth : res.length
  for(let i = 0; i<target ; i++){ str += `*${i+1} : ${res[i].title}*\n${res[i].link}\n\n` }
  




  await m.bot.sendUi(m.chat, {caption:`
  ╔═════════════╗
  ╠╣ *🎾WASI MD Match List 🏏*╠╣   
  ╚═════════════╝
  
  _Use: ${prefix}score ${res[0].link}_
  _To get Match information!_
  
  *Total Match: ${res.length}*
  *Showing Results: ${target}*
  
  ${str.trim()}
  

  _Use *${prefix}cricsrh all/5/20* to get more results!_
  `.trim()},{quoted:m},"text")
  
  
  }else await m.reply("_No Results Found!_")
}catch(e){ m.error(`${e}\n\nCmdname: cricsrh` , e , false)  }
  
  
  })
  



  smd({
    cmdname: "score",  
    alias:["matchs","cricscore"],  
    desc: "Check information about match!",  },
  async(m,text) => {
try{
  let url  = text? text.split(" ")[0] : lastMatch 
  if(!/cricbuzz.com/gi.test(url)) return await m.reply(`_Provide cricbuzz.com match url!_
_Use : *${prefix}crcsrh* To get Match result!_

⚠️🏏 *NOTE:* _provide crickbuzz match link first time, After that, bot'll show data of same match just using *${prefix}score*!_
`)
    let data = await smdJson("https://api-smd.vercel.app/api/score?url="+url)
    if(data && data.status && data.msg){
    lastMatch = url;
    await m.bot.sendUi(m.chat, {caption: data.msg.trim()},{quoted:m},"text")
  } else await m.reply("_No Match Found!_")
}catch(e){ m.error(`${e}\n\nCmdname: score` , e , false)  }
  
  
  })
