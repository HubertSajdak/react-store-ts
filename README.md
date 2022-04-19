# Clothing Store is an e-commerce site built with create-react-app

This site was created using:

- HTML/JSX,
- CSS (FLexbox,Grid),
- React,
- Redux Toolkit,
- React Router (version 5),
- React Icons,
- Formik,
- Yup (schema builder for runtime value and validation),
- React Toastify
- Firebase (for user authentication)

Clothes data is provided by https://fakestoreapi.com

## Current functionalities

- Registration/Logging,
- Sorting and filtering store items,
- Toggling view of items in the store page,
- Adding items to the cart (Cart data is being saved in the local storage),
- Auto Logout function (when the browser tab is hidden the unique id token provided by Firebase is being removed from the local storage after 1 minute),
- Informing user about actions with toastify popup info.

## Future Improvements

- Add profile page,
- Add checkout page,

### Live Version

https://clothing-storeapp.netlify.app/

### How to install

- git clone https://github.com/HubertSajdak/react-store.git
- npm install
- npm start
