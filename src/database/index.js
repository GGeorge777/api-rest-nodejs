const mongoose = require("mongoose"); 
mongoose.connect("mongodb://mongo:cDkDmSZPLIY0MzmEjZPA@containers-us-west-205.railway.app:5790", { useNewUrlParser: true })
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;