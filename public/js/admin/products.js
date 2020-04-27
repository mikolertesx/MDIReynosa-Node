const requests = require('./requests');
const csrfToken = document.querySelector('input[name="_csrf"]').value;

const editButtons = document.querySelectorAll('.product-edit');
const deleteButtons = document.querySelectorAll('.product-delete');
const templateEdit = document.querySelector('#product-edit');
const templateFinished = document.querySelector('#product-finished');
const addButton = document.querySelector('.add');

let editable = true;
let sendable = true;
let imageChanged = false;
let onCancelDelete = false;
let attributes = {};
let holders = {};

addButton.addEventListener('click', (event) => {
  event.preventDefault();

  if (!editable) return;
  const productsForm = document.querySelector('.products');
  const form = createForm();
  productsForm.insertBefore(form, productsForm.lastChild);
  editable = false;
})

const createForm = () => {
  const form = document.importNode(templateEdit.content, true);
  const confirmButton = form.querySelector('.product-accept');
  const cancelButton = form.querySelector('.product-cancel');
  const url = form.querySelector('input[name="url"]');
  const id = form.querySelector('input[name="id"]');
  const name = form.querySelector('input[name="name"]');
  const price = form.querySelector('input[name="price"]');
  const description = form.querySelector('textarea[name="description"]');
  const image = form.querySelector('img[name="img"]');
  const imagePicker = form.querySelector('input[name="img-picker"]');

  onCancelDelete = true;

  holders = {
    id,
    url,
    name,
    price,
    description,
    image,
    form,
    confirmButton,
    cancelButton
  };

  sendable = false;
  requests.CreateProduct(csrfToken)
    .then(idVal => {
      console.log(idVal, id);
      id.value = idVal;
      sendable = true;
      confirmButton.addEventListener('click', confirmHandle);
      cancelButton.addEventListener('click', cancelHandle);
      imagePicker.addEventListener('change', (sender) => {
        console.log(sender);
        sendable = false;
        imageChanged = true;

        requests
          .SendImage(sender.target, csrfToken)
          .then((result) => {
            image.src = result.path;
            console.log(result.path);
            sendable = true;
          });
      });
    });

  return form;
}

const confirmHandle = (sender) => {
  if (!sendable) { return; }
  onCancelDelete = false;
  const superParent = sender.target.closest('.product');
  const container = superParent.parentElement;

  attributes = {
    name: holders.name.value,
    price: holders.price.value,
    image: holders.image.getAttribute("src"),
    description: holders.description.value,
    id: holders.id.value,
    url: holders.url.value
  };

  console.log(attributes.price);
  if (attributes.price === '') {
    alert('Por favor cambie el precio.');
    holders.price.value = 0;
    return;
  }


  const clone = document.importNode(templateFinished.content, true);
  const newAttributes = { ...attributes };

  if (!imageChanged) {
    newAttributes['image'] = null;
  }

  imageChanged = false;

  console.log('attributes', attributes);
  console.log('container', container);
  console.log('clone', clone);
  console.log('superparent', superParent);

  productFill(clone, attributes);
  container.replaceChild(clone, superParent);

  requests.PatchProduct(newAttributes['id'], newAttributes, csrfToken);

  editable = true;
}

const cancelHandle = (sender) => {
  if (!sendable) { return; }
  if (imageChanged) {
    requests.DeleteImage(holders.image.getAttribute('src'), csrfToken);
  }

  imageChanged = false;
  const superParent = sender.target.closest('.product');
  const container = superParent.parentElement;
  const clone = document.importNode(templateFinished.content, true);
  console.log(superParent);
  if (onCancelDelete) {
    const id = superParent.querySelector('input[name="id"]');
    requests.DeleteProduct(id.value, csrfToken)
    superParent.remove();
    editable = true;
    sendable = true;
    return;
  }
  productFill(clone, attributes);
  container.replaceChild(clone, superParent);
  editable = true;
}

const editHandle = (handler) => {
  if (!editable || !sendable) {
    alert('Confirma los cambios antes de continuar al siguiente.');
    return;
  }
  editable = false;
  console.log(handler);
  const button = handler.target;
  const parentElement = button.closest('.product');
  const attributes = getAttributes(parentElement);
  ReplaceElement(parentElement, attributes);
}

const deleteHandle = (sender) => {
  if (!editable) {
    alert('Confirma los cambios antes de continuar.');
    return;
  }
  const superParent = sender.target.closest('.product');
  const id = superParent.querySelector('.product-id').value;
  const container = superParent.parentElement;
  superParent.remove();
  requests.DeleteProduct(id, csrfToken);
}

const formPrevent = (sender) => {
  sender.preventDefault();
}

const productFill = (element, data) => {
  console.log('Element', element);
  console.log('Data', data);
  const name = element.querySelector('.product-name');
  const price = element.querySelector('.product-price');
  const image = element.querySelector('.product-image');
  const description = element.querySelector('.product-description');
  const id = element.querySelector('.product-id');
  const url = element.querySelector('.product-url');
  const editButton = element.querySelector('.product-edit');
  const deletebutton = element.querySelector('.product-delete');

  editButton.addEventListener('click', editHandle);
  deletebutton.addEventListener('click', deleteHandle);

  name.innerText = attributes['name'];
  price.innerHTML = attributes['price'];
  image.src = attributes['image'];
  description.innerText = attributes['description'];
  url.value = attributes['url'];
  id.value = attributes['id'];
}

const getAttributes = (element) => {

  const nameElement = element.querySelector('h3').innerText;
  const priceElement = element.querySelector('.product-price').innerText;
  const imageElement = element.querySelector('.product-image').src;
  const elementId = element.querySelector('.product-id').value;
  const productUrl = element.querySelector('.product-url').value;
  const description = element.querySelector('.product-description').innerText;

  const newAttributes = {
    name: nameElement,
    price: priceElement,
    image: imageElement,
    description: description,
    url: productUrl,
    id: elementId
  };

  attributes = newAttributes;

  return newAttributes;
}

const ReplaceElement = (element, object) => {
  const parentElement = element.parentElement;
  const clone = document.importNode(templateEdit.content, true);
  console.log(clone);
  const id = clone.querySelector('input[name="id"]');
  const url = clone.querySelector('input[name="url"]');
  const name = clone.querySelector('input[name="name"]');
  const price = clone.querySelector('input[name="price"]');
  const description = clone.querySelector('textarea[name="description"]');
  const image = clone.querySelector('img[name="img"]');
  const imagePicker = clone.querySelector('input[name="img-picker"]');
  const form = clone.querySelector('form');
  const confirmButton = clone.querySelector('.product-accept');
  const cancelButton = clone.querySelector('.product-cancel');

  holders = {
    id,
    url,
    name,
    price,
    description,
    image,
    form,
    confirmButton,
    cancelButton
  };

  id.value = object['id'];
  url.value = object['url'];
  name.value = object['name'];
  price.value = object['price'];
  image.src = object['image'];
  description.value = object['description']


  imagePicker.addEventListener('change', (sender) => {
    console.log(sender);
    sendable = false;
    imageChanged = true;

    requests
      .SendImage(sender.target, csrfToken)
      .then((result) => {
        image.src = result.path;
        console.log(result.path);
        sendable = true;
      });
  });
  // form.addEventListener('submit', formPrevent);
  confirmButton.addEventListener('click', confirmHandle);
  cancelButton.addEventListener('click', cancelHandle);
  parentElement.replaceChild(clone, element);
}

editButtons.forEach(button => {
  button.addEventListener('click', editHandle);
})

deleteButtons.forEach(button => {
  button.addEventListener('click', deleteHandle);
})