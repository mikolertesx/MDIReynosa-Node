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

module.exports.DeleteProduct = (id, csrfToken) => {
  const endpoint = '/admin/deleteproduct';
  fetch(endpoint, {
    headers: {
      'CSRF-Token': csrfToken,
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
    body: JSON.stringify({ id: id })
  });
}

module.exports.DeleteImage = (imagePath, csrfToken) => {
  const endpoint = `/admin/deletepicture`;
  fetch(endpoint, {
    headers: {
      'CSRF-Token': csrfToken,
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
    body: JSON.stringify({ path: imagePath })
  });
  console.log(endpoint);
}

module.exports.CreateProduct = (csrfToken) => {
  const endPoint = `/admin/createproduct`;
  return fetch(endPoint, {
    headers: {
      'CSRF-Token': csrfToken,
      'Content-Type': 'application/json'
    },
    method: 'POST',
  }).then(response => response.json())
  .then(data => {
    return data.id;
  })
}

module.exports.PatchProduct = (id, attributes, csrfToken) => {
  const endPoint = `/admin/updateproduct/${id}`;
  console.log('Patching product with', attributes);
  fetch(endPoint, {
    headers: {
      'CSRF-Token': csrfToken,
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(attributes)
  })
}