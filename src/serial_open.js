const {SerialPort} = require('serialport');
const {ReadlineParser} = require('@serialport/parser-readline');
const fs = require('fs');

const json = fs.readFileSync("data.json");
const jsonData = JSON.parse(json);
const portStatus = jsonData['port'];

const port = new SerialPort({
  path : 'COM3',
  baudRate : 9600,
});

const parser = port.pipe(new ReadlineParser({delimiter: '\r\n'}));

port.on('open', (err) => {
  if (err) {
    return console.error("Gagal Membuka Port: ", err.message);
  }
  jsonData["port"] = true;
  const update = JSON.stringify(jsonData, null, 2);
  fs.writeFile("data.json", update, (err) => {
    if (err) {
      console.error("Tidak dapat menyimpan port! Error: ", err);
    }
  })
  console.log("Port terbuka...");
});

parser.on('data', (data) => {
  document.querySelector("#data").innerHTML = "Data diterima: " + data;
  console.log("Data diterima:", data);
});

function portClose() {
  console.log("Menutup port serial...");

  jsonData["port"] = false;
  const update = JSON.stringify(jsonData, null, 2);
  fs.writeFile("data.json", update, (err) => {
    if (err) {
      console.error("Tidak bisa menyimpan port! Error: ", err);
    }
  });

  document.querySelector("#data").innerHTML = "Port ditutup";
  port.close((err) => {
    if (err) {
      console.error("Gagal menutup port:", err.message);
    } else {
      console.log("Port serial ditutup.");
    }
  });
}
