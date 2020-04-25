module.exports.SendImage = (FilePicker, csrfToken) => {
  const endPoint = "/admin/sendpicture";
  const formData = new FormData();
  formData.append('image', FilePicker.files[0]);

  return fetch(endPoint, {
    headers: {
      'CSRF-Token': csrfToken
    },
    method: 'POST',
    body: formData
  })
  .then(response => {
    return response.json();
  })
  .then(json => {
    return json;
  });
}