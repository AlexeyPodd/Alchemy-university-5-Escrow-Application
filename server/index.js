const express = require("express");
const app = express();
const cors = require("cors");

const port = 3042;

app.use(cors());
app.use(express.json());

const contracts = [];

app.get("/contracts", (req, res) => {
    res.send({contracts});
});

app.post("/new-contract", (req, res) => {
    const {contract} = req.body;
    if(!contract) return res.status(400).send({ message: "Not specified contract address!" });
    contracts.push(contract);
    return res.send({amount: contracts.length});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
