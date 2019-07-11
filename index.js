const Express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const handler = require("./handler");
const sweetsMore = require("./sweetsMore");



const express = new Express();
express.use(cors());
express.use(bodyParser.json());
express.use(Express.static(__dirname));

express.post("/register", handler.registerUser);
express.get('/api/users', handler.getUsers);
express.get("/api/users/:email",handler.getUserByEmail);
express.put("/user/:email", handler.updateUser);
express.delete("/user/:email", handler.deleteUser);
express.post("/login", handler.loginUser);

express.post("/sweetsAdd", handler.addSweets);
express.get("/getAllSweets", handler.getAllSweets);
express.post("/upload", handler.uploadImage);

express.put("/Sweet/Update/:id",sweetsMore.updateSweets);
express.delete("/Sweet/Delete/:id",sweetsMore.deleteSweets);
express.post("/Sweet/Addtocart",sweetsMore.addToCart);
express.get("/addToCart/:email", sweetsMore.getAddToCarts);
express.put("/buySweets/:email/:id",sweetsMore.buySweets);


express.listen(3000, () => console.log("Server running on port 3000"));

