  $(function () {
  var socket = io();
  socket.on('message', function(msg){
    console.log(msg);
    $('#map').text(msg);
  });
});
