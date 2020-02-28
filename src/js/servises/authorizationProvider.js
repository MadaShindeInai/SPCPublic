import { CLIENT_ID, API_KEY } from '../controller/variables';

const USERINFO = document.getElementById('userInfo');
const USERIMG = document.getElementById('userImg');
const USERNAME = document.getElementById('userName');
const LOGIN = document.getElementById('logIn');
const LOGOUT = document.getElementById('logOut');

export default class AuthorizationProvider {
  static init() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
      }).then(() => console.log('init OK'), () => console.log('init ERR'));
    });
    window.gapi.load('client:auth2', AuthorizationProvider._initClient);
  }

  static _initClient() {
    window.gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
    }).then(() => {
      console.log('init OK');
    }, () => console.log('init ERR'));
  }

  static logInF() {
    const authOk = (googleUser) => {
      LOGIN.style.display = 'none';
      USERINFO.style.display = 'flex';
      LOGOUT.style.display = 'block';

      USERIMG.src = googleUser.getBasicProfile().getImageUrl();
      USERNAME.innerHTML = googleUser.getBasicProfile().getName().toString();

      const profile = googleUser.getBasicProfile();
      console.log(`ID: ${profile.getId()}`);
      console.log(`Name: ${profile.getName()}`);
      console.log(`Image URL: ${profile.getImageUrl()}`);
      console.log(`Email: ${profile.getEmail()}`);
    };

    const authErr = () => {
      console.log('Auth ERR');
    };

    const GoogleAuth = window.gapi.auth2.getAuthInstance();

    GoogleAuth.signIn({
      scope: 'profile email',
    }).then(authOk, authErr);
  }

  static logOutF() {
    const signOutOk = () => {
      LOGIN.style.display = 'block';
      USERINFO.style.display = 'none';
      LOGOUT.style.display = 'none';
    };

    const signOutErr = () => {
      console.log('signOut ERR');
    };

    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    GoogleAuth.signOut().then(signOutOk, signOutErr);
  }
}
