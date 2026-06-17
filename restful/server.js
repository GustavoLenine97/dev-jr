const express = require("express")
const app = express()
const data = require("./data.json");

app.use(express.json());

app.get("/clients", function(req, res){
    res.json(data);
});

app.get("/clients/:id", function(req, res){
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    if(!client) return res.status(404).json();

    res.json(client);
});

app.post("/clients/", function(req, res){
    const { nome, email } = req.body;

    // Salvar

    res.json({ nome, email });
});

app.put("/clients/:id", function(req, res){
    
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    if(!client) return res.status(204).json();

    const { email } = req.body;
    
    client.email = email;

    res.json(client);
});

app.delete("/clients/:id", function(req, res){
    const { id } = req.params;
    const clientsFiltered = data.filter(client => client.id != id)

    res.json(clientsFiltered);
});



app.listen(3000, function(){
    console.log("Server is running")
});

