import { Socket } from 'phoenix';

let socket = new Socket('/socket', { params: { token: window.userToken } });
socket.connect();

// create an instance of phoenix's socket library.
// attempt to connect to channel "comments:!"

// the socket library, on the javascript side, tries to connect to "comments:1"
// user_sockets has a name comments:*
//

// logs success/fail message

const createSocket = topicId => {
  // #1 ATTEMPT TO JOIN CHANNEL

  let channel = socket.channel(`comments:${topicId}`, {});
  // #4 CALL JOIN AND RECEIVE DATA FROM JOIN
  channel
    .join()
    .receive('ok', resp => {
      console.log(resp);
      renderComments(resp.comments);
    })
    .receive('error', resp => {
      console.log('Unable to join', resp);
    });

  channel.on(`comments:${topicId}:new`, renderComment);

  document.querySelector('button').addEventListener('click', () => {
    const content = document.querySelector('textarea').value;

    channel.push('comment:add', { content: content });
  });
};

function renderComments(comments) {
  const renderedComments = comments.map(comment => {
    return commentTemplate(comment);
  });

  document.querySelector('.collection').innerHTML = renderedComments.join('');
}

function renderComment(event) {
  const renderedComment = commentTemplate(event.comment);

  document.querySelector('.collection').innerHTML += renderedComment;
}

function commentTemplate(comment) {
  let email = 'Anonymous';

  if(comment.user) {
    email = comment.user.email;
  }

  return `
    <li class="collection-item">
      ${comment.content}
      <div class="secondary-content">
        ${email}
      </div>
    </li>
  `;
}

window.createSocket = createSocket;
