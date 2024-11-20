const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const api = express();
const cors = require('cors');
const PORT = 3001;

//etablece conexion con express
api.use(express.json());
api.use(cors());
const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}
)
db.connect((err)=>{
    if(err){
        console.log("EROR",err);
        return;
    }
    console.log("conectado");
}
)


api.get('/',(req,res)=>{
    res.send("Hola mundo")
})


api.get('/menu',(req,res)=>{
    const { articulo }= req.params;
    db.query('SELECT * FROM `restaurant__articulo`',(err,result)=>{
        if(err){
            res.status(500).json({message : err.message})
            return
        }
       
        res.json(result)
    })
})

api.get('/filterAsc',(req,res)=>{
    const { articulo }= req.params;
    db.query('SELECT * FROM `restaurant__articulo` ORDER BY precio ASC;',(err,result)=>{
        if(err){
            res.status(500).json({message : err.message})
            return
        }
       
        res.json(result)
    })
})

api.get('/filterDesc',(req,res)=>{
    const { articulo }= req.params;
    db.query('SELECT * FROM `restaurant__articulo` ORDER BY precio DESC;',(err,result)=>{
        if(err){
            res.status(500).json({message : err.message})
            return
        }
       
        res.json(result)
    })
})

api.get('/category/:categoria',(req,res)=>{
    const { categoria }= req.params;
    db.query('SELECT * FROM `restaurant__articulo` WHERE FK_TIPO_ARTICULO = ? ORDER BY precio DESC;',[categoria],(err,result)=>{
        if(err){
            res.status(500).json({message : err.message})
            return
        }
       
        res.json(result)
    })
})


api.get('/menu/:articulo',(req,res)=>{
    const { articulo }= req.params;
    db.query('SELECT * FROM `restaurant__articulo` WHERE nombre LIKE ?',[`%${articulo}%`],(err,result)=>{
        if(err){
            res.status(500).json({message : err.message})
            return
        }
       
        res.json(result)
    })
})


api.post('/login',(req,res)=>{
    const { email, password }= req.body;

    db.query('SELECT * FROM `restaurant__usuario` WHERE `email`=? AND `password`=?;',[email,password],(err,result)=>{
        if(err){
            res.status(500).json({message : err.message})
         
            return
        }
       
        res.json(result)
    })
})


api.get('/register/:email/:password',(req,res)=>{
    const { email, password }= req.params;

    db.query('INSERT INTO `restaurant__usuario` (email, password, date_at) VALUES (?, ?, current_timestamp());',[email,password],(err,result)=>{
        if(err){
            res.status(500).json({message : err.message})
         
            return
        }
       
        res.json(result)
    })
})

api.get('/validarUsuario/:email',(req,res)=>{
    const { email }= req.params;

    db.query('SELECT * FROM `restaurant__usuario` WHERE `email`=?;',[email],(err,result)=>{
        if(err){
            console.log(result);
            res.status(500).json({message : err.message})
         
            return
        }
       
        res.json(result)
    })
})

 api.get('/buscarArticulo/:id',(req,res)=>{
         const { id }= req.params;

         db.query('SELECT * FROM `restaurant__articulo` WHERE `ID_ARTICULO`=?;',[id],(err,result)=>{
         if(err){
            console.log(result);
             res.status(500).json({message : err.message})
         
             return
         }
       
         res.json(result)
     })
 })


 api.get('/stockArticulo',(req,res)=>{
    const {  }= req.params;

    db.query('SELECT ID_ARTICULO AS id, stock FROM `restaurant__articulo`',(err,result)=>{
    if(err){
       console.log(result);
        res.status(500).json({message : err.message})
    
        return
    }
  
    res.json(result)
})
})











api.post('/modificarStockProductos', (req, res) => {
    const { id, stock } = req.body;

    db.query(
        'UPDATE `restaurant__articulo` SET `stock`=? WHERE `ID_ARTICULO` = ? ',
        [id, stock],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: err.message });
            }

            res.json(result);
        }
    );
});


api.get('/stockArticulo',(req,res)=>{
    const {  }= req.params;

    db.query('SELECT ID_ARTICULO AS id, stock FROM `restaurant__articulo`',(err,result)=>{
    if(err){
       console.log(result);
        res.status(500).json({message : err.message})
    
        return
    }
  
    res.json(result)
})
})




api.post('/obtenerIdCarrito',(req,res)=>{
    const { id }= req.body;

    db.query('SELECT ID_CARRITO AS id FROM `restaurant__carrito` WHERE FK_USER = ?;',[id],(err,result)=>{
    if(err){
       console.log(result);
        res.status(500).json({message : err.message})
    
        return
    }
  
    res.json(result)
})
})



api.post('/insertarProductoCarrito',(req,res)=>{
    const { idCarrito, idProducto,cantidad }= req.body;

    db.query('INSERT INTO `restaurant__carrito_articulo`(`cantidad`, `FK_ARTICULO`, `FK_CARRITO`) VALUES (?,?,?);',[cantidad,idProducto,idCarrito],(err,result)=>{
    if(err){
       console.log(result);
        res.status(500).json({message : err.message})
    
        return
    }
  
    res.json(result)
})
})


api.post('/registrarTotalPagado',(req,res)=>{
    const { idCarrito, total }= req.body;

    db.query('INSERT INTO `restaurant__compra`(`total`, `FK_CARRITO`) VALUES (?,?);',[total,idCarrito],(err,result)=>{
    if(err){
       console.log(result);
        res.status(500).json({message : err.message})
    
        return
    }
  
    res.json(result)
})
})








 api.post('/carrito', (req, res) => {
    const { estado, FK_USER } = req.body;

    db.query(
        'INSERT INTO `restaurant__carrito`(`estado`, `FK_USER`) VALUES (?, ?)',
        [estado, FK_USER],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: err.message });
            }

            res.json(result);
        }
    );
});


api.post('/infoCarrito', (req, res) => {
    const { FK_USER } = req.body;

    db.query(
        'SELECT * FROM `restaurant__carrito` WHERE FK_USER = ?',
        [FK_USER],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: err.message });
            }

            res.json(result);
        }
    );
});








api.post('/addCarrito', (req, res) => {
    const { cantidad,FK_ARTICULO, FK_CARRITO } = req.body;

    db.query(
        'INSERT INTO `restaurant__carrito_articulo`( `cantidad`, `FK_ARTICULO`, `FK_CARRITO`) VALUES (?,?,?)',
        [cantidad,FK_ARTICULO, FK_CARRITO],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: err.message });
            }

            res.json(result);
        }
    );
});



api.post('/stockArticulo', (req, res) => {
    const { ID_ARTICULO } = req.body;

    db.query(
        'SELECT stock,disponibilidad FROM `restaurant__articulo` WHERE ID_ARTICULO = ?;',
        [ID_ARTICULO],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: err.message });
            }

            res.json(result);
        }
    );
});




 
 



api.listen(PORT,()=>{
    console.log(PORT);
})
