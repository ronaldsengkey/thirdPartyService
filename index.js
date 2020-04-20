'use strict';
require('dotenv').config();
var mongoose = require('mongoose').set('debug', true);
var mongoConf = require('./config/mongo.js');
var fs = require('fs'),
    path = require('path'),
    morgan = require('morgan'),
    cluster = require('cluster'),
    bodyParser = require('body-parser'),
    numCPUs = require('os').cpus().length,
    helmet = require('helmet'),
    http = require('http');

// var app = require('connect')();
var oas3Tools = require('oas3-tools');
var jsyaml = require('js-yaml');
const fastify = require('fastify')({
  logger: {
    prettyPrint: true 
  }
})
var serverPort = process.env.PORT_APP;
fastify.use(bodyParser.json());
fastify.use(morgan('dev'));

const io = require('socket.io')(fastify.server);
const message = require('./models/messageM');
const marray = require('./config/array');

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
oas3Tools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  fastify.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  fastify.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  fastify.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  fastify.use(middleware.swaggerUi());

  fastify.use(helmet())

  // Start the server
  // http.createServer(app).listen(serverPort, function () {
  //   console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  //   console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  // });
  
  const amqp = require('amqplib') // Import library amqp
  // const { execSync } = require("child_process");

// async function sleep(delay) {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, delay);
//     });
// }

// async function createChannel(config) {
//   const { url, publishers, listeners } = Object.assign({url: "", publishers: {}, listeners: {}}, config);
//   try {
//       // create connection
//       const connection = await amqp.connect(url);
//       let channel = null;
//       connection._channels = [];
//       connection.on("error", (error) => {
//           console.error("Connection error : ", config, error);
//       });
//       connection.on("close", async (error) => {
//           if (channel) {
//               channel.close();
//           }
//           console.error("Connection close : ", config, error);
//           await sleep(1000);
//           createChannel(config);
//       });
//       // create channel
//       channel = await connection.createConfirmChannel();
//       channel.on("error", (error) => {
//           console.error("Channel error : ", config, error);
//       });
//       channel.on("close", (error) => {
//           console.error("Channel close : ", config, error);
//       });
//       // register listeners
//       for (hello in listeners) {
//           const callback = listeners[hello];
//           channel.assertQueue(hello, { durable: false });
//           channel.consume(hello, callback);
//       }
//       // publish
//       for (hello in publishers) {
//           const message = publishers[hello];
//           channel.assertQueue(hello, { durable: false });
//           channel.sendToQueue(hello, message);
//       }
//       return channel;
//   } catch (error) {
//       console.error("Create connection error : ", error);
//       await sleep(1000);
//       createChannel(config);
//   }
// }

// async function main() {
//   // publish "hello" message to queue
//   const channelPublish = await createChannel({
//       url: "amqp://user:bitnami@192.168.0.100:5672",
//       publishers: {
//           "queue": Buffer.from("hello"),
//       }
//   });

//   // restart rabbitmq
//   // execSync("docker stop rabbitmq");
//   // execSync("docker start rabbitmq");

//   // consume message from queue
//   const channelConsume = await createChannel({
//       url: "amqp://user:bitnami@192.168.0.100:5672",
//       listeners: {
//           "queue": (message) => {
//               console.log("Receive message ", message.content.toString());
//           },
//       }
//   });

//   return true;
// }

// main().catch((error) => console.error(error));

// var server = "amqp://user:bitnami@192.168.0.100:5672";

// var connection, channel;

// function reportError(err){
//   console.log("Error happened!! OH NOES!!!!");
//   console.log(err.stack);
//   process.exit(1);
// }

// function createChannel(conn){
//   console.log("creating channel");
//   connection = conn;
//   return connection.createChannel();
// }

// cusss inisiet fungsi diatas hehe
// producer()

   if(cluster.isMaster) {

    console.log(`Master ${process.pid} is running`);
    console.log('master cluster setting up '+numCPUs+' workers')
  
    // Fork workers.
    for (let i = 0; i < 1; i++) {
      cluster.fork();
    }


    cluster.on('online',function(worker, code, signal){
      // console.log('Worker ' + worker.process.pid + ' is online');
    })

    //Check if work is died
    cluster.on('exit', (worker, code, signal) => {
      console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
      console.log('Starting a new worker');
      cluster.fork();
    });

  }else{

    let worker = cluster.worker.id;
  // Start the server
    const start = async () => {
      try {
        mongoose.connect(mongoConf.mongoDb.url, {
          useNewUrlParser: true
        }).then(function (e) {
          console.log("MONGO CONNECTED");
        });
        // const socketUsers = {};
        const clients = {};
        const account = {};
        // io.on('connection', async function (socket) {
        //   console.log('Socket CONNECTED :', socket.id);
        //   let employeeId;
          
        //   socket.on('user_connect', async function (data) {
        //     clients[socket.id] = socket;
        //     // socketUsers[socket.id] = {
        //     //   id: data.id,
        //     //   socketid: socket.id,
        //     //   username: data.username,
        //     //   company: data.company,
        //     // };
        //     if (account[data.id]) {
        //       account[data.id].socketid.push(socket.id)
        //     }
        //     else {
        //       account[data.id] = {
        //         id: data.id,
        //         socketid: [socket.id],
        //         username: data.username,
        //         company: data.company,
        //       }
        //     }
        //     console.log('user connect: ', account);
        //     employeeId = data.id;
            
        //     io.emit('user_connect', { user: Object.values(account) });
        //   });

        //   // socket.on('getFile', async function (data) {
        //   //   let file = await setup.getFile(data.id);
        //   //   if (file.responseCode == process.env.SUCCESS_RESPONSE) {
        //   //     socket.emit('setFile', {
        //   //       partnerId: data.partnerId,
        //   //       chatId: data.chatId,
        //   //       code: file.data.code
        //   //     })
        //   //   }
        //   //   else {
        //   //     socket.emit('chat-error', {
        //   //       "code": update.responseCode
        //   //     });
        //   //   }
        //   // });

        //   socket.on('sendChat', async function (data) {
        //     console.log("data sendChat: ", data);
            
        //     let status = "pending";
        //     let read = "0";
        //     let msg = data.message;

        //     let params = {
        //       senderId: data.senderId,
        //       receiverId: data.receiverId,
        //       message: msg,
        //       status: status,
        //       type: data.type,
        //       read: read,
        //     }
        //     try {
        //       let create = await message.create(params);
        //       // let create = {
        //       //   responseCode: "400",
        //       //   responseMessage: 'error broo'
        //       // }
        //       if (create.responseCode == "200") {
        //         let messageData = await message.find(create.data);
        //         let receiver = account[data.receiverId].socketid;
        //         for (let rec of receiver) {
        //           clients[rec].emit('chat', {
        //             data: messageData.data[0],
        //             chatId: messageData.data[0].senderId
        //           });  
        //         }
                
        //         let sender = account[employeeId].socketid;
        //         for (let sen of sender) {
        //           clients[sen].emit('chat', {
        //             data: messageData.data[0],
        //             chatId: messageData.data[0].receiverId,
        //             clientCode: data.clientCode
        //           });
        //         }
        //         // socket.emit('chat', {
        //         //   data: messageData.data[0],
        //         //   chatId: messageData.data[0].receiverId
        //         // });
        //         let params = {
        //           'param': {
        //               '_id': create.data
        //           },
        //           'data': {
        //               status: "delivered",
        //               read: "0",
        //           }
        //         }
        //         let update = await message.update(params);
        //         if (update.responseCode == "200") {
        //           messageData = await message.find(create.data);
        //           for (let sen of sender) {
        //             clients[sen].emit('updateChat', {
        //               data: messageData.data[0]
        //             });
        //           }
        //           // socket.emit('updateChat', {
        //           //   data: messageData.data[0]
        //           // })
        //           for (let rec of receiver) {
        //             clients[rec].emit('updateChat', {
        //               data: messageData.data[0]
        //             });  
        //           }
        //           // clients[data.receiver].emit('updateChat', {
        //           //   data: messageData.data[0]
        //           // })
        //         }
        //       }
        //       else {
        //         socket.emit('chat-error', {
        //           "message": create.responseMessage,
        //           "clientCode": data.clientCode
        //         });
        //       }
        //     } catch (error) {
        //       console.log('eror: ', error);
        //       socket.emit('chat-error', {
        //         "message": "something wrong please try again!",
        //         "clientCode": data.clientCode
        //       });
        //     }
            
        //   });

        //   socket.on('updateChat', async function (data) {
        //     let params = {
        //       'param': {
        //           '_id': data.id
        //       },
        //       'data': {
        //           status: data.status,
        //           read: data.read,
        //       }
        //     }
        //     let update = await message.update(params);
        //     if (update.responseCode == "200") {
        //       if (data.sender) {
        //         let messageData = await message.find(data.id);
        //         // clients[data.sender].emit('updateChat', {
        //         //   data: messageData.data[0]
        //         // })
        //         let receiver = account[messageData.data[0].receiverId].socketid;
        //         for (let rec of receiver) {
        //           clients[rec].emit('updateChat', {
        //             data: messageData.data[0]
        //           });  
        //         }                             
        //         console.log('update sender');
                
        //         let sender = account[messageData.data[0].senderId].socketid;
        //         for (let sen of sender) {
        //           clients[sen].emit('updateChat', {
        //             data: messageData.data[0]
        //           });
        //         }
        //         // socket.emit('updateChat', {
        //         //   data: messageData.data[0]
        //         // })
        //         console.log('update receiver');
                
        //       }
        //     }
        //     else {
        //       socket.emit('chat-error', {
        //         "message": update.responseCode
        //       });
        //     }
        //   });

        //   // socket.on('chat', async function (data) {
        //   //   console.log("data: ", data);
        //   //   let params = {
        //   //     'param': {
        //   //         '_id': data.message
        //   //     },
        //   //     'data': {
        //   //         status: "delivered",
        //   //         read: "0",
        //   //     }
        //   //   }
        //   //   await message.update(params);
        //   //   let messageData = await message.find(data.message);
        //   //   clients[data.receiver].emit('chat', {
        //   //     data: messageData.data[0],
        //   //     chatId: messageData.data[0].senderId
        //   //   });
        //   //   socket.emit('chat', {
        //   //     data: messageData.data[0],
        //   //     chatId: messageData.data[0].receiverId
        //   //   });
        //   // });
          
        //   socket.on('disconnect', async function () {
        //     console.log('Socket DISCONNECTED');
          
        //     // await console.log(socket.id);
        //     // await console.log(socketUsers[socket.id].id);
        //     // await console.log(account[employeeId].socketid);

        //     // console.log(account[socketUsers[socket.id].id].socketid, `${socket.id}`);
        //     try {
        //       marray.removeArray(account[employeeId].socketid, `${socket.id}`)
        //       // delete socketUsers[socket.id];
        //       delete clients[socket.id];
        //       io.emit('user_connect', {
        //         user: Object.values(account)
        //       });
        //     } catch (error) {
        //       console.log('error: ', error);
        //     }
        //     console.log(account);
        //   });
        // });
        // ============================= SOCKET IO ===============================
        await fastify.listen(serverPort, '0.0.0.0');
        fastify.log.info();
      } catch (err) {
        console.log(err)
        fastify.log.error(err)
        process.exit(1)
      }
    }
    start()
  }

});
