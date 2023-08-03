// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAaPClEYQARLQwRWwLXx8ezqPgYg55M1Z0',
  authDomain: 'task-techforing.firebaseapp.com',
  projectId: 'task-techforing',
  storageBucket: 'task-techforing.appspot.com',
  messagingSenderId: '851728845810',
  appId: '1:851728845810:web:31f9e3029c56d59405b96b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
