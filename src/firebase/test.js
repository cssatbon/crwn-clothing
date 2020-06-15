import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users')
  .doc('somedocid')
  .collection('cartItems')
  .doc('cartItemIds');

// same as
firestore.doc('/users/userId/cartItems/cartItemId');
firestore.collection('/users/userId/cartItems'); // item collection
