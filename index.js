const http = require('http');
const os = require('os');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const authorInfo = `Autor: Hanna Panizovich\n`;
    const currentDate = new Date();
    const serverInfo = `Serwer uruchomiony: ${currentDate.toLocaleString()}\n`;
    const clientIp = req.socket.remoteAddress;

    // Logowanie informacji o serwerze
    const logInfo = authorInfo + serverInfo + `Port: ${PORT}\n`;
    fs.appendFileSync('server.log', logInfo);

    // Wyświetlanie informacji w przeglądarce klienta
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<p>Adres IP klienta: ${clientIp}</p>`);

    // Pobieranie daty i czasu w strefie czasowej klienta
    const clientTime = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' });
    res.write(`<p>Czas w strefie czasowej klienta: ${clientTime}</p>`);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`, `Imię autora serwera: Hanna Panizovich`);
});
