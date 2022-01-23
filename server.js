const http = require('http'); // importa o protocolo http para o projeto
const app = require('./app.js');
const port = process.env.PORT || 3000; // Caso a porta não seja definida, será utilizada a porta 30000
const server = http.createServer(app);
server.listen(port);

