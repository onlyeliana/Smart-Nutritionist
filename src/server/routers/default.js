import Router from '@koa/router';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4U6uIS9l84G0xN6m2rm36kOSpdL3IBuQ",
  authDomain: "smart-nutritionist-edc80.firebaseapp.com",
  projectId: "smart-nutritionist-edc80",
  storageBucket: "smart-nutritionist-edc80.appspot.com",
  messagingSenderId: "624873562651",
  appId: "1:624873562651:web:2e78104af493b53dbdcebe",
  measurementId: "G-05ZD1TQWS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getUsers(db) {
  const usersCollection = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCollection);
  const userList = usersSnapshot.docs.map(doc => doc.data());
  return userList;
}

const router = new Router({});

router.get('/', async (ctx) => {
  ctx.body = {
    message: 'welcome to your LLM app server',
  };
  return;
});


router.post('/login', async (ctx) => {
    const data = await getUsers(db)
    for(let i in data){
      if(data[i].username === ctx.request.body.username && data[i].password === ctx.request.body.password){
        ctx.body = data[i];
        return;
      }
    }
    ctx.body = null;
});
export default router
