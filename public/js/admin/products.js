const requests = require('./requests');
const csrfToken = document.querySelector('input[name="_csrf"]').value;

const editButtons = document.querySelectorAll('.product-edit');
const deleteButtons = document.querySelectorAll('.product-delete');
const templateEdit = document.querySelector('#product-edit');
const templateFinished = document.querySelector('#product-finished');

let editable = true;
let sendable = true;
let imageChanged = false;
let attributes = {};
let holders = {};

const confirmHandle = (sender) => {
  if (!sendable) {return;}
  const superParent = sender.target.closest('.product-edition');
  const container = superParent.parentElement;
  const clone = document.importNode(templateFinished.content, true);

  attributes = {
    name: holders.name.value,
    price: holders.price.value,
    image: holders.image.getAttribute("src"),
    description: holders.description.value,
    id: holders.id.value
  };

  const newAttributes = { ... attributes };
  
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
  const superParent = sender.target.closest('.product-edition');
  const container = superParent.parentElement;
  const clone = document.importNode(templateFinished.content, true);

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
  const container = superParent.parentElement;
  superParent.remove();
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
  const editButton = element.querySelector('.product-edit');
  const deletebutton = element.querySelector('.product-delete');

  editButton.addEventListener('click', editHandle);
  deletebutton.addEventListener('click', deleteHandle);

  name.innerText = attributes['name'];
  price.innerHTML = attributes['price'];
  image.src = attributes['image'];
  description.innerText = attributes['description'];
  id.value = attributes['id'];
}

const getAttributes = (element) => {

  const nameElement = element.querySelector('h3').innerText;
  const priceElement = element.querySelector('.product-price').innerText;
  const imageElement = element.querySelector('.product-image').src;
  const elementId = element.querySelector('.product-id').value;
  const description = element.querySelector('.product-description').innerText;

  const newAttributes = {
    name: nameElement,
    price: priceElement,
    image: imageElement,
    description: description,
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
    name,
    price,
    description,
    image,
    form,
    confirmButton,
    cancelButton
  };

  id.value = object['id'];
  name.value = object['name'];
  price.value = object['price'];
  image.src = object['image'];
  description.value = object['description']


  imagePicker.addEventListener('change', (event) => {
    console.log(event);
    sendable = false;
    imageChanged = true;

    requests
      .SendImage(event.target, csrfToken)
      .then((result) => {
        image.src = result.path;
        console.log(result.path);
        sendable = true;
      });
  });
  form.addEventListener('submit', formPrevent);
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