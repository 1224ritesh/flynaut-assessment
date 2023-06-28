const joinbtn = document.getElementById('joinbtn'); // room join button
const roomcode = document.getElementById('roomcode'); // input field containing room code
const tilecenter = document.getElementById('tilecenter'); // dive for displaying messages
const tiletop = document.getElementById('tiletop'); // div for displaying active users
const message = document.getElementById('message'); // input field containing message
const sendbtn = document.getElementById('sendbtn'); // messege send button

// getting email from local storage of browser 
const socket = io.connect({
    auth: {
        email: email,
    },
});


joinbtn.addEventListener('click', (e) => {
    if (roomcode.value == '') {
        alert('Room code cannot be empty');
    } else {
        socket.emit('joinroom', roomcode.value);
    }
});


sendbtn.addEventListener('click', () => {
    if (message.value !== '') {
        socket.emit('sendmessage', message.value, roomcode.value);
    }
});


socket.on('connect', () => {
    console.log(socket.id);
});


socket.on('disconnect', () => {
    console.log(socket.id);
});

socket.on('newjoiner', (users) => {
    tiletop.innerHTML = '';
    users.forEach((element) => {
        if (element === email) {
            roomJoined();
            tiletop.innerHTML += "<p id='" + element + "'>You have joined!</p>";
        } else {
            tiletop.innerHTML += "<p id='" + element + "'>" + element + " have joined!</p>";
        }
    });
});

// function to display message on the screen when a new message is received from server side.
socket.on('newmessage', (incoming, usermail) => {
    message.value = ''; // making value of input field containing message empty

    // checking if the message is sent by the current user or not. 
    // If sent by current user then displaying "You" instead of email
    if (usermail === email) {
        tilecenter.innerHTML +=
            "<div class='msg'>" +
            "<p class='msgtop'>You</p>" +
            "<p class='msgcnt'>" +
            incoming +
            '</p>' +
            '</div>';
    } else {
        tilecenter.innerHTML +=
            "<div class='msg'>" +
            "<p class='msgtop'>" +
            usermail +
            '</p>' +
            "<p class='msgcnt'>" +
            incoming +
            '</p>' +
            '</div>';
    }

    // scrolling the message displaying div to bottom so that the latest message is visible
    const sh = tilecenter.scrollHeight;
    tilecenter.scrollTo(0, sh);
});

// this function is called when a new user joins the room and the room is joined by the current user
function roomJoined() {
    const top = document.getElementById('front');
    top.style.transform = 'translateY(-100%)';
}