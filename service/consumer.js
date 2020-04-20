'use strict';
const amqp = require('amqplib');

function cmr(data){
  return new Promise(async function (resolve, reject) {
    const queueName = data;
    let message = '';
    try {
      // buka koneksi ke rabbitmq
      let connection = await amqp.connect('amqp://guest:guest@localhost:5672')
      // buat channel
      let channel = await connection.createChannel();
      channel.assertQueue(queueName, { durable: true })    // Menyatakan antriannya adalah 'task_queue'
      channel.prefetch(1)
      await channel.consume(queueName, (msg) =>{
        console.log('awal', msg);
        console.log('json', JSON.stringify(msg.content.toString()));
        const secs = msg.content.toString().split('.').length - 1;
        console.log(`[x] Received %s`, msg.content.toString());
        setTimeout(() => {
          console.log(`[x] Done`);
          channel.ack(msg)
        }, secs * 1000)
        resolve(JSON.stringify(msg.content.toString()));
      },{noAck:false});
    }catch(err){
      console.log("error get message", err)
      reject(process.env.ERRORINTERNAL_RESPONSE);
    }
  })
}

// async function cmr(data) {
//   // simpan nama antrian
//   const queueName = data;
//   let message = '';
//   try {
//     console.log('CALLED !!');
        // ch.assertQueue(q, { durable: true })    // Menyatakan antriannya adalah 'task_queue'
        // ch.prefetch(1)
        // console.log(`[*] Waiting for messages in %s. To exit press CTRL+C`, q)
        // /* Menangkap pesan yang dikirimkan RabbitMQ dari antrian */
        // ch.consume(q, msg => {
        //   const secs = msg.content.toString().split('.').length - 1
    
        //   console.log(`[x] Received %s`, msg.content.toString())
        //   setTimeout(() => {
        //     console.log(`[x] Done`)
        //     ch.ack(msg)
        //   }, secs * 1000)
        // }, { noAck: false })

      
      // buat nama antrian
      // channel.assertQueue(queueName, { durable: true })
      // channel.prefetch(1)
      // ambil pesan ke antrian yang telah dibuat
      // channel.consume(queueName, (msg) => {
          // simpan muatan yang berisi JSON pada pesan
          // let payload = msg.content.toString()
          // tampilkan pesan masuk pada terminal
          // console.log("%s:'%s'", msg.fields.routingKey, payload)
          // return msg.fields.routingKey, payload ;
          // tampilkan menunggu pesan pada terminal
          // console.log('Listening for messages...', )
      // }, { noAck: false })
//   }
//   catch (err) {
//       // munculkan pesan error pada terminal
//       console.log(err);
//       return process.env.ERRORINTERNAL_RESPONSE;
//   }
// }


exports.consumeMessage = function(data) {
    return new Promise(async function(resolve, reject) {
      try{
        let message = '';
        let a = await cmr(data);
        let json = JSON.parse(a);
        message = {
          responseCode:process.env.SUCCESS_RESPONSE,
          responseMessage:"Message received !",
          data: json
        }
        resolve(message);
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
