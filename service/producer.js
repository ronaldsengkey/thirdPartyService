'use strict';
const amqp = require('amqplib');
let message = '';

async function producer(data) {
  // simpan nama antrian
  let queueName = data.param;
  // buat muatan pesan yang berisi json
  let payload = {
      "message": data.content
  }

  try {
      // buka koneksi ke rabbitmq
      let connection = await amqp.connect('amqp://guest:guest@localhost:5672')
      // buat channel
      let channel = await connection.createChannel()
      // buat nama antrian
      channel.assertQueue(queueName, { durable: true })
      // kirim pesan ke antrian yang telah dibuat
      let a =  new Buffer.from(JSON.stringify(payload));
      var options = {
        persistent: true,
        // noAck: true,
        timestamp: Date.now(),
        contentEncoding: "utf-8",
        contentType: "text/plain"
      };
      channel.sendToQueue(queueName,a, options)
      // tampilkan pesan pada terminal
      console.log(`[x] Sent: ${payload.message}`); 
      // matikan proses setelah pesan terkirim
      setTimeout(() => {
          // Tutup Koneksi
          connection.close()
          // hentikan proses
          process.exit(0)
      }, 500);
      return process.env.SUCCESS_RESPONSE;
  }
  catch (err) {
      // munculkan pesan error pada terminal
      console.log(err)
      return(process.env.ERRORINTERNAL_RESPONSE);
  }
}

exports.produceMessage = function(data) {
  return new Promise(async function(resolve, reject) {
    try{
      let a = await producer(data);
      console.log("ccccccccc", a);
      switch(a){
        case process.env.SUCCESS_RESPONSE:
          message = {
            responseCode:process.env.SUCCESS_RESPONSE,
            responseMessage:"Message has been saved !"
          }
          break;
        case process.env.ERRORINTERNAL_RESPONSE:
          message = {
            responseCode:process.env.ERRORINTERNAL_RESPONSE,
            responseMessage:"Internal server error, please try again!",
            error:a
          }
          break;
      }
      reject(message);
    }catch(err){
      console.log(err);
      message = {
        responseCode:process.env.ERRORINTERNAL_RESPONSE,
        responseMessage:"Internal server error, please try again!"
      }
      reject(message);
    }
  });
}

