const http = require('http')
const createHandler = require('git-webhook-handler')
const handler = createHandler([{ path: '/webhook/synapse-bot', secret: 'hzhyang-nb' }])

const keys = [
    {
        name: '',
        path: '',
        sh: ''
    }
]


http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(7777)

handler.on('error', function (err) {
    console.error('Error:', err.message)
})

// handler.on('issues', function (event) {
//     console.log('Received an issue event for %s action=%s: #%d %s',
//         event.payload.repository.name,
//         event.payload.action,
//         event.payload.issue.number,
//         event.payload.issue.title)
// })

function RunCmd(cmd, args, cb) {
    const spawn = require('child_process').spawn;
    const child = spawn(cmd, args);
    let result = '';
    child.stdout.on('data', function(data) {
        result += data.toString();
    });
    child.stdout.on('end', function() {
        cb(result)
    });
}

handler.on('push', function (event) {
    console.log(event);
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref)
    // RunCmd('cd', [/home/])
    // RunCmd('sh',[])
})
