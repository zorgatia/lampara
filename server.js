const express = require('express')
const connectDB = require('./config/db')
const mqtt = require('mqtt')
const path = require('path');
const option={
    port: 17901,
    host: 'mqtt://farmer.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'egqtvfwk',
    password: 'yiyGLqEI47OY',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
}

const client  = mqtt.connect('mqtt://farmer.cloudmqtt.com',option)

client.on('connect', () => {
    console.log('connected');
    client.subscribe('meteo',()=>{
        client.on('message',(topic,message,packet)=>{
            console.log("Resived "+message+" on "+ topic)
        })
    })
  })
  
const app = express();


connectDB();

app.use(express.json({ extended: false}));
app.use(express.json({ extended: false}));

app.get('/',(req,res)=> res.send('API Running'));
app.get('/',(req,res)=> res.send('API Running'));

app.use('/mob/user',require('./routes/mob/user'));
app.use('/mob/auth',require('./routes/mob/auth'));
app.use('/mob/plage',require('./routes/mob/plage'));
app.use('/mob/event',require('./routes/mob/event'));


app.use('/web/plage',require('./routes/web/plage'));
app.use('/web/user',require('./routes/web/user'));
app.use('/web/auth',require('./routes/web/auth'));
app.use('/web/buoy',require('./routes/web/buoy'));


app.use('/emb/buoy',require('./routes/emb/buoy'));

app.use('/ds/rate',require('./routes/ds/rate'));


//Server static assest in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('admin/build'))
    app.get('*',(req,res)=> {
        res.sendFile(path.resolve(__dirname,'admin','build','index.html'))
    })
}

const PORT =  process.env.PORT || 5002;


app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));
