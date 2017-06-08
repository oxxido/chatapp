
import './_home.scss';

HomeController.$inject = ['$scope', 'socket'];

function HomeController($scope, socket) {
    const ctrl = this;

    // state
    ctrl.user = false;
    ctrl.username = '';
    ctrl.newMessage = '';
    ctrl.connected = false;
    ctrl.connectedUsers = 0;
    ctrl.messages = [];
    ctrl.error = false;
    ctrl.loggingIn = false;

    // Methods
    ctrl.setLogin = setLogin;
    ctrl.addParticipantsMessage = addParticipantsMessage;
    ctrl.sendMessage = sendMessage;
    ctrl.onKeyPress = onKeyPress;

    function onKeyPress($event, action) {
        const keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            if(action==='login') {
                setLogin();
            } else {
                sendMessage();
            }
        }
    }

    function setLogin() {
        ctrl.loggingIn = true;
        socket.emit('add user', { username: ctrl.username, password: ctrl.password });
    }

    function addParticipantsMessage (data) {
        ctrl.connectedUsers = data.numUsers;
    }

    function sendMessage() {
        // if there is a non-empty message and a socket connection
        if (ctrl.newMessage && ctrl.connected) {
          let message = {
            username: ctrl.username,
            message: ctrl.newMessage
          };
          ctrl.messages.push(message);
          // tell server to execute 'new message' and send along one parameter
          socket.emit('new message', ctrl.newMessage);
          ctrl.newMessage = '';
        }
    }

    //socket events:
    socket.on('login', function (data) {
        ctrl.connected = true;
        ctrl.user = data.username;
        ctrl.token = data.token;
        // Display the welcome message
        //console.log(data);
        addParticipantsMessage(data);
        ctrl.loggingIn = false;
        $scope.$digest();
    });

    socket.on('new message', function (message) {
        ctrl.messages.push(message);
        $scope.$digest();
    });

    socket.on('user joined', function (data) {
        ctrl.messages.push({
            username: 'admin',
            message: data.username + ' joined...'
        });
        $scope.$digest();
    });

    socket.on('user left', function (data) {
        ctrl.messages.push({
            username: 'admin',
            message: data.username + ' left...'
        });
        $scope.$digest();
    });

    socket.on('login failed', function (data) {
        ctrl.loggingIn = false;
        ctrl.error = "Login failed for user:" + data.username;
        $scope.$digest();
    });

}

export default HomeController;
