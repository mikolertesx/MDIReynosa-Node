module.exports.getIndex = (req, res, next) => {
  console.log(req.session.user || 'No registrado');
  res.render('shop/index');
}

module.exports.getContact = (req, res, next) => {
  res.render('shop/contact');
}

module.exports.getProducts = (req, res, next) => {
  res.render('shop/products',
  {
    products: [
      {
        id: 1,
        name: 'Un producto',
        image: 'https://homedepot.cdnonline.com.mx/00A5606/media2/productos/139825/139825-d.jpg',
        description: 'Ya sabes lo que diré...',
        price: 14.55
      },
      {
        id: 2,
        name: 'Otro producto',
        image: 'https://dev.autycom.com/wp-content/uploads/2018/04/Importancia-del-PLC-en-la-Industria.jpg',
        description: 'Otro producto poco importante',
        price: 14.69
      }
    ]
  });
}