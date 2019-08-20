const express = require('express')
const connectDB = require('./config/db')


const app = express();
const app1 = express();

connectDB();

app.use(express.json({ extended: false}));
app1.use(express.json({ extended: false}));

app.get('/',(req,res)=> res.send('API Running'));
app1.get('/',(req,res)=> res.send('API Running'));

app.use('/mob/user',require('./routes/mob/user'));
app.use('/mob/auth',require('./routes/mob/auth'));
app.use('/mob/plage',require('./routes/mob/plage'));

app.use('/web/plage',require('./routes/web/plage'));
app.use('/web/user',require('./routes/web/user'));
app.use('/web/auth',require('./routes/web/auth'));
app.use('/web/buoy',require('./routes/web/buoy'));


app1.use('/emb/buoy',require('./routes/emb/buoy'));

app1.use('/ds/rate',require('./routes/ds/rate'));




const PORT =  process.env.PORT || 5002;
const PORT1 = process.env.PORT || 5003;

app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));
app1.listen(PORT1,()=> console.log(`Server started on port ${PORT1}`));