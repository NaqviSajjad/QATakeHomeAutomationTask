export const SELECTORS = {
  navbar: {
    signUp: '#signin2',
    logIn: '#login2',
    logOut: '#logout2',
    welcome: '#nameofuser',
    cart: '#cartur',
  },
  home: {
    loginLink: '#login2',
    signupLink: '#signin2',
    cartLink: '#cartur',
  },
  loginModal: {
    root: '#logInModal',
    username: '#loginusername',
    password: '#loginpassword',
    submitButton: '#logInModal button',
  },
  signupModal: {
    root: '#signInModal',
    username: '#sign-username',
    password: '#sign-password',
    submitButton: '#signInModal button',
  },
  product: {
    cardLink: 'a.hrefch',
    addToCartButton: 'button',
  },
  cart: {
    placeOrderButton: 'button',
    purchaseButton: 'button',
    okButton: 'button',
  },
  cartModal: {
    root: '#orderModal',
    name: '#name',
    country: '#country',
    city: '#city',
    card: '#card',
    month: '#month',
    year: '#year',
    purchaseButton: '#orderModal button.btn.btn-primary',
  },
};
