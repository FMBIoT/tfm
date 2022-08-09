var numClients = 0;
updateError = {};

function clientConnected(socket) {
  console.log('Socket: client connected');

  numClients++;
  socket.on('disconnect', clientDisconnected );
}

function clientDisconnected() {
  console.log('Socket: client disconnected');

  numClients--;
}

function sendUpdate(req,res,next) {
  let body = req.body.contextResponses[0].contextElement
  var io = req.io;
  let registry = body.attributes[0].value
  let valor = body.attributes[2].value
  updateError={"type":body.type,"id":body.id,"registry":registry,"value":valor}
  
  io.emit('fiwareUpdate', updateError);
}

function sendHistorical(req,res,next) {
  var io = req.io;
  io.emit('historicalRequest', req.body);
}

module.exports = {
  clientConnected,
  sendUpdate,
  sendHistorical
};