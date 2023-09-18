const express = require('express');

const AuthController = require("./src/controllers/AuthController");
const AdminController = require("./src/controllers/AdminController");
const router = express.Router();

const authenticateMiddleware = require("./src/middlewares/authenticate");

const app = express();

app.use(express.json());


app.use("/auth", AuthController)
app.use("/admin", authenticateMiddleware, AdminController);

router.get("/", async(req, res) => {
    return res.json({
        message: "Api cadastro do usuario"
    });
})

app.listen(5790, () => {
    console.log('Server esta rodando');
})