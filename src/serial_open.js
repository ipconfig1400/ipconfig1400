const {SerialPort} = require('serialport');
const {ReadlineParser} = require('@serialport/parser-readline');

const port = new SerialPort({
  path : 'COM3',
  baudRate : 9600,
});

const parser = port.pipe(new ReadlineParser({delimiter: '\r\n'}));

port.on('open', (err) => {
  if (err) {
    return console.error("Gagal Membuka Port: ", err.message);
  }
  console.log("Port terbuka...");
});

parser.on('data', (data) => {
  document.querySelector("#data").innerHTML = "Data diterima: " + data;
  console.log("Data diterima:", data);
});

function portClose() {
  console.log("Menutup port serial...");
  document.querySelector("#data").innerHTML = "Port ditutup";
  port.close((err) => {
    if (err) {
      console.error("Gagal menutup port:", err.message);
    } else {
      console.log("Port serial ditutup.");
    }
  });
}



// const { SerialPort } = require('serialport');
// const { ReadlineParser } = require('@serialport/parser-readline');

// const port = new SerialPort({
//   path: 'COM3',
//   baudRate: 115200, // Gunakan baudrate yang sama dengan Python
// });

// // Gunakan delimiter yang sama dengan yang diharapkan oleh Arduino Anda (\r\n atau \n)
// // Umumnya, Arduino Serial.println() mengirimkan \r\n
// const parser = new ReadlineParser({ delimiter: '\r\n' });
// port.pipe(parser);

// // Event listener untuk memastikan port telah terbuka
// port.on('open', () => {
//   console.log("Port COM3 Terbuka dengan Sukses!");

//   // --- BAGIAN PENTING: Mengirim perintah 'g' seperti di Python ---
//   // Kirim perintah 'g' setiap beberapa waktu atau sebagai pemicu awal
//   // Mari kita mulai dengan mengirimnya sekali setelah port terbuka,
//   // dan kemudian secara berkala jika data tidak terus-menerus dikirim
//   // oleh Arduino tanpa pemicu.
  
//   // port.write('g\n', (err) => { // Mengirim 'g' diikuti newline
//   //   if (err) {
//   //     return console.error('Error saat menulis ke port:', err.message);
//   //   }
//   //   console.log('Perintah "g" berhasil dikirim.');
//   // });

//   // Jika Arduino hanya mengirim data SETELAH menerima 'g'
//   // dan hanya mengirim satu baris per 'g', Anda perlu mengirim 'g' secara berulang.
//   // Misalnya, setiap 1 detik:
//   setInterval(() => {
//     port.write('g\n', (err) => {
//       if (err) {
//         return console.error('Error saat menulis berulang:', err.message);
//       }
//       // console.log('Perintah "g" dikirim ulang.');
//     });
//   }, 1000); // Kirim 'g' setiap 1 detik
// });

// // Event listener untuk data yang diterima (setelah diparse oleh ReadlineParser)
// parser.on('data', (data) => {
//   // Data sudah dalam bentuk string karena ReadlineParser
//   console.log("Data diterima:", data.toString()); // Gunakan toString() untuk memastikan jika tidak string
// });

// // Event listener untuk error
// port.on('error', (err) => {
//   console.error("Terjadi error pada port serial:", err.message);
// });

// // Event listener ketika port ditutup
// port.on('close', () => {
//   console.log("Port serial tertutup.");
// });

// // Handle Ctrl+C untuk menutup port dengan bersih
// process.on('SIGINT', () => {
//   console.log("\nMenutup port serial...");
//   port.close((err) => {
//     if (err) {
//       console.error("Gagal menutup port:", err.message);
//     } else {
//       console.log("Port serial ditutup.");
//     }
//     process.exit();
//   });
// });
