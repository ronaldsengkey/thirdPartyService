const io = require('socket.io-client');
var redis = require("redis");
var client = redis.createClient();

async function getProfilingRedis(key) {
    return new Promise(async function (resolve, reject) {
        client.get(key, function (err, result) {
            resolve(result);
        })
    })
}

async function cpuProfiling() {
    return new Promise(async function (resolve, reject) {
        var appmetrics = require('appmetrics');
        var monitoring = appmetrics.monitor();
        let cpuData = {};
        monitoring.on('cpu', function (cpu) {
            client.set("cpu", JSON.stringify(cpu));
        });
        monitoring.on('eventloop', function (eventloop) {
            client.set("eventloop", JSON.stringify(eventloop));
        });
        monitoring.on('gc', function (gc) {
            client.set("gc", JSON.stringify(gc));
        });
        monitoring.on('loop', async function (loop) {
            client.set("loop", JSON.stringify(loop));
        });
        monitoring.on('memory', function (memory) {
            client.set("memory", JSON.stringify(memory));
        });
        cpuData.cpu = await getProfilingRedis('cpu');
        cpuData.eventloop = await getProfilingRedis('eventloop');
        cpuData.gc = await getProfilingRedis('gc');
        cpuData.loop = await getProfilingRedis('loop');
        cpuData.memory = await getProfilingRedis('memory');
        resolve(JSON.stringify(cpuData));
    })
}

async function openSocket(config) {
    const socket = io(process.env.CONFIG_HOST, {
        path: '/configService'
    });
    socket.on('connect', async () => {
        let param = {
            serviceName: process.env.SERVICE_NAME,
            domain: process.env.DOMAIN,
            hostName: process.env.HOST_NAME,
            port: process.env.APP_PORT,
            server: process.env.SERVER,
            category: process.env.CATEGORY,
            status: 'on',
            cpuProfiling: await cpuProfiling()
        }
        socket.emit('dashboardConnect',param);
    });
}

module.exports = {openSocket}