let connection = null;

class Realtime {
    constructor() {
        this._nsp = null;
    }
    connect(server, namespace, sessionMiddleware) {
        const io = require('socket.io')(server);
        this._nsp = io.of(namespace)

        this._nsp.use(function (socket, next) {
            sessionMiddleware(socket.request, socket.request.res, next);
        });
        this._nsp.on('connection', (socket) => {
            console.log(socket.id);
        });
    }

    sendEvent(event, data) {
        this._nsp.emit(event, data);
    }

    registerEvent(event, handler) {
        this._nsp.on(event, handler);
    }

    static init(server, namespace, sessionMiddleware) {
        if (!connection) {
            connection = new Realtime();
            connection.connect(server, namespace, sessionMiddleware);
        }
    }

    static getConnection() {
        if (!connection) {
            throw new Error("no active connection");
        }
        return connection;
    }
}

module.exports = {
    connect: Realtime.init,
    connection: Realtime.getConnection
}