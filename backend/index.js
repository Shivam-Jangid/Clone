const express = require("express");
const cors = require('cors');
const mainRouter = require("./routes/index");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", mainRouter);
app.listen(3000,()=>{
    console.log("app listening on port 3000");
});
