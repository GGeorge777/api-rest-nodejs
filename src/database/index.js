const mongoose = require("mongoose"); 
mongoose.connect("mongodb+srv://MatheusDev:88420087@api-mongo.5of6pib.mongodb.net/", { useNewUrlParser: true })
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;