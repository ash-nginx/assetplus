const express = require('express')
var mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser')
const app = express()
const port = 8000
const cors = require('cors');
const path = require('path');
// const db = "mongodb://localhost:27017/assignment";
const db = "mongodb+srv://Ashnginx:qSrUsWiLDmipEhCc@cluster0.b0sfmat.mongodb.net/test";
// const db =  "mongodb+srv://dbUser:admin@learning.sj3py.mongodb.net/test?authSource=admin&replicaSet=atlas-hrawxx-shard-0&readPreference=primary&ssl=true"
const client = "http://localhost:3000";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const intializeSequrity = () => {
    app.use(helmet.frameguard());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.hsts());
    app.use(helmet.ieNoOpen());
    app.use(helmet.noSniff());
    app.use(helmet.xssFilter());
}

const intializeMiddleware =  () => {
    app.use(bodyParser.json());
    app.use(cors({origin:client}));
}
const conSuccess = mongoose.connection
conSuccess.once('open', _ => {
    console.log('Database connected on ', db)
})
conSuccess.on('error', err => {
    console.error('connection error:', err)
})

app.use(express.json());
intializeSequrity();
intializeMiddleware();
app.use(require("./routes"));

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})

process.on('SIGINT', async function () {
    await mongoose.disconnect();
    process.exit(0)
});