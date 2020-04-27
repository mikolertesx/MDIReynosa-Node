const requests = require('./requests');

const acceptButtons = document.querySelectorAll('.usuario-aceptar');
const rejectButtons = document.querySelectorAll('.usuario-rechazar');
const csrfToken = document.querySelector('input[name="_csrfToken"]').value;

const getUserId = (event) => {
  const button = event.target;
  const parent = button.closest('.usuario-controles');
  const userId = parent.querySelector('input[name="_id"]').value;
  return userId;
}

const acceptUser = (event) => {
  const userId = getUserId(event);
  requests.AcceptUser(userId, csrfToken).then(() => {
    location.reload();
  })
}

const rejectUser = (event) => {
  const userId = getUserId(event);
  requests.RejectUser(userId, csrfToken).then(() => {
    location.reload();
  });
}

for (const button of acceptButtons) {
  button.addEventListener('click', acceptUser);
}
for (const button of rejectButtons) {
  button.addEventListener('click', rejectUser);
}