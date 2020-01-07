const express = require("express");
const mongoose = require('mongoose');
const mentorsRoute = require('./routes/admin-routes');

// Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const SwaggerOptions = require('./swagger/swagger.json');
const swaggerDocument = swaggerJsDoc(SwaggerOptions);

const app = express();
app.use(express.json()) 
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'*');
    res.setHeader("Access-Control-Allow-Methods",'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers",'Content-Type,Authorization');
    next();
 }) 

app.use('/api', mentorsRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.use((error,req,res,next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message:message});
})
mongoose.connect("mongodb+srv://ikhlaq:H74vcNJWSh2KJolP@cluster0-khjj8.mongodb.net/pets?retryWrites=true&w=majority"
).then(result =>{
    app.listen(process.env.PORT || 8080); 
}).catch(err =>{
    console.log(err)
})

