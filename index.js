const express =require("express");
const convertCode = require("./Routes/Convert");
require('dotenv').config();
const cors=require("cors")


const app=express()
const PORT = process.env.PORT || 8000;
app.use(express.json())
app.use("/",convertCode)
app.use(cors())


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});