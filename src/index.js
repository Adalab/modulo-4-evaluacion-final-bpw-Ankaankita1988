const express = require("express")
const cors = require ("cors")
const  mysql =require ("mysql2/promise")

require ('dotenv').config();

const api = express();
api.use(cors());
api.use(express.json({limit:'50mb'}));

const port = process.env.PORT;
api.listen(port,() =>{
  console.log(`Server is running in http://localhost:${port}`);
});

async function connectDB() {
const conex = await mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});
conex.connect();
  //console.log(conex);
return conex;
}
//connect DB();

api.post('/cocktail', async (req, res ) =>{

  const{nombre, ingredientes, preparacion} = req.body;

  if (!nombre || !ingredientes || !preparacion) {
    res.status(404).json({
     succes:false,
     message: 'Campos obligatorios: nombre, ingredientes, preparacion', 
    });
   } else {
    const conex = await connectDB();
    const sql =
    'INSERT INTO cocktail (nombre, ingredientes, preparacion ) value (?, ?, ?)';
    const [result] = await  conex.query(sql, [nombre, ingredientes, preparacion]);
    res.status(200).json({
      succes:true,
      id:result.insertId,
    });
   }
});

api.get('/cocktail', async  (req, res) =>{
  try{
    const conex = await connectDB();
    const sql = 'SELECT * FROM cocktail';
    const [result] =await conex.query(sql);
  
  conex.end();

  res.status(200).json({
    info: {count:result.length},
    results: result,
  });
}catch(error){
  succes: false,
  message: 'Error interno del servidor',
  });
}
});    