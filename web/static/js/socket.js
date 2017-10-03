import {Socket} from "phoenix";

let socket = new Socket("/socket", {params: {token: window.userToken}});
socket.connect();

// create an instance of phoenix's socket library.
// attempt to connect to channel "comments:!"

// the socket library, on the javascript side, tries to connect to "comments:1"
// user_sockets has a name comments:*
//

// logs success/fail message


const createSocket = (topicId) => {

  // #1 ATTEMPT TO JOIN CHANNEL

  let channel = socket.channel(`comments:${topicId}`, {});
  // #4 CALL JOIN AND RECEIVE DATA FROM JOIN
  channel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp) })
    .receive("error", resp => { console.log("Unable to join", resp) });

  document.querySelector('button').addEventListener('click', () => {
    const content = document.querySelector('textarea').value;

    channel.push("comment:add", { content: content })
  })
}

window.createSocket = createSocket
