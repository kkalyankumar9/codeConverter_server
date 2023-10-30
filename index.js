const express =require("express");
const convertCode = require("./Routes/Convert");
const cors=require("cors")
require('dotenv').config();


const PORT = process.env.PORT || 8000;
const app=express()
app.use(cors());

app.use(express.json())
app.use("/",convertCode)



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});