const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const cookieParser = require("cookie-parser");
const url = "mongodb://projetoaula:projeto2023@ac-n746omc-shard-00-00.maqs5mo.mongodb.net:27017,ac-n746omc-shard-00-01.maqs5mo.mongodb.net:27017,ac-n746omc-shard-00-02.maqs5mo.mongodb.net:27017/?ssl=true&replicaSet=atlas-flrds2-shard-0&authSource=admin&retryWrites=true&w=majority";
const dbName = "ProjetoTDW";
app.use(express.json())
app.use(cookieParser()) 

const hoteis = require("./Controllers/hotel");
const quartos = require("./Controllers/quarto");
const auth = require("./Controllers/auth");
const users = require("./Controllers/users");


const connect = mongoose.connect(url, { dbName: dbName, useNewUrlParser: true, useUnifiedTopology: true
});

connect.then((db) => {

   app.use("/api/hoteis", hoteis)
   app.use("/api/quartos", quartos)
   app.use("/api/auth", auth)
   app.use("/api/users", users)

   app.use((err,req,res,next) => {
      const errStatus = err.status || 500 // se o erro tiver um status é mostrado esse status, se não tiver então é erro 500
      const errMessage = err.message || "Algo deu errado!" // igual ao de cima porém com a mensagem do erro
      return res.status(errStatus).json(errMessage)
   })



   app.listen(port, () => console.log('Conectado à DB'))

})
