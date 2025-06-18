import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { auth, db, storage } from './firebaseConfig';
import messaging from '@react-native-firebase/messaging';
export const GetFirestoreTimeStamp = () => {
  try {
    const timestamp = firestore.Timestamp.now();
    return timestamp;
  } catch (error) {
    console.log('error while getting server timestamp', error);
    throw error;
  }
};

export async function getAllOfCollection(collection) {
  try {
    let data = [];
    let querySnapshot = await db.collection(collection).get();
    querySnapshot.forEach(function (doc) {
      if (doc.exists) {
        data.push(doc.data());
      } else {
        console.log('No document found!');
      }
    });
    return data;
  } catch (error) {
    console.log('error while fetching collection data', error);
    throw error;
  }
}
export async function saveData(collection, doc, jsonObject) {
  try {
    await db
      .collection(collection)
      .doc(doc)
      .set(jsonObject)
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  } catch (error) {
    console.log('Error writing document: ', error);
    throw error;
  }
}
export async function saveDataInSubCollection(
  collection,
  doc,
  subcollection,
  subdoc,
  jsonObject
) {
  try {
    await db
      .collection(collection)
      .doc(doc)
      .collection(subcollection)
      .doc(subdoc)
      .set(jsonObject)
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  } catch (error) {
    console.log('Error writing document: ', error);
    throw error;
  }
}
export async function updateData(collection, doc, jsonObject) {
  try {
    await db
      .collection(collection)
      .doc(doc)
      .set(jsonObject, { merge: true })
      .catch(function (error) {
        console.error('Error update document: ', error);
      });
  } catch (error) {
    console.log('Error update document: ', error);
    throw error;
  }
}
export async function updateSubCollectionData(
  collection,
  doc,
  subcollection,
  subDoc,
  jsonObject
) {
  try {
    await db
      .collection(collection)
      .doc(doc)
      .collection(subcollection)
      .doc(subDoc)
      .set(jsonObject, { merge: true })
      .catch(function (error) {
        console.error('Error update document: ', error);
      });
  } catch (error) {
    console.log('Error update document: ', error);
    throw error;
  }
}
export async function addToCollection(collection, jsonObject) {
  try {
    await db
      .collection(collection)
      .add(jsonObject)
      .catch(function (error) {
        console.error('error while adding document: ', error);
      });
  } catch (error) {
    console.log('error while adding document', error);
    throw error;
  }
}
export async function addToSubCollection(
  collection,
  doc,
  subcollection,
  jsonObject
) {
  try {
    await db
      .collection(collection)
      .doc(doc)
      .collection(subcollection)
      .add(jsonObject)
      .catch(function (error) {
        console.error('error while adding document to subcollection: ', error);
      });
  } catch (error) {
    console.log('error while adding document to subcollection: ', error);
  }
}
export async function addToArray(collection, doc, array, value) {
  try {
    let docRef = await db.collection(collection).doc(doc);
    let docData = await docRef.get();
    console.log('check', docData.exists);
    if (docData.exists && docData.data()[array] != undefined) {
      docRef.update({
        [array]: firebase.firestore.FieldValue.arrayUnion(value),
      });
    } else {
      saveData(collection, doc, { [array]: [value] });
    }
  } catch (error) {
    console.log('error while adding to array: ', error);
    throw error;
  }
}
export function getData(collection, doc) {
  try {
    return db
      .collection(collection)
      .doc(doc)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          return false;
        }
      });
  } catch (error) {
    console.log('error while fetching data: ', error);
    throw error;
  }
}
export function GetChatGroupData(collection, doc) {
  try {
    return db
      .collection(collection)
      .doc(doc)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          return { ...doc.data(), id: doc.id };
        } else {
          return false;
        }
      });
  } catch (error) {
    console.log('error while fetching data: ', error);
    throw error;
  }
}
export async function getDataWithSnapShot(collection) {
  try {
    return new Promise((resolve, reject) => {
      function onResult(QuerySnapshot) {
        resolve(QuerySnapshot);
      }
      function onError(error) {
        console.error(error);
        reject(error);
      }
      firestore().collection(collection).onSnapshot(onResult, onError);
    });
  } catch (error) {
    console.log('error while fetching data with snapshot: ', error);
  }
}
export async function UpdloadImageToDb(response) {
  var today = new Date();
  var mili = today.getMilliseconds();
  let kk = Date.parse(today);
  kk = kk + mili;
  let progress = 0;
  let file = await uriToBlob(response.uri);
  response.fileName = kk + response.fileName;
  let url = null;
  const uploadTask = storage.ref(`StarImage/${response.fileName}`).put(file);
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      if (progress == 100) {
        console.log('progress', progress);
      }
    },
    (error) => {
      console.log('error 1', error);
    },
    async () => {
      return await downloadImage('StarImage', response.fileName);
    }
  );
}
export async function uriToBlob(uri) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      reject(new Error('uriToBlob failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
}
export async function downloadImage(folder, imageName) {
  var storageRef = storage.ref();
  var pathRef = storageRef.child(folder + '/' + imageName);

  let url = await pathRef.getDownloadURL();
  return url;
}
export async function GetMyFcm() {
  try {
    let fcmToken = '';
    const fetch = await messaging().getToken();
    console.log(fetch)
    if (fetch) {
      fcmToken = fetch;
    }
    return fcmToken;
  } catch (error) {
    console.log('error while getting fcm token', error);
  }
}
export async function saveDataWithoutDocId(collection, jsonObject) {
  let docRef = await db.collection(collection).doc();
  docRef.set(jsonObject);
  return docRef;
}
export async function requestUserPermissionMessaging() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Notification permission granted.');
  } else {
    console.log('Notification permission denied.');
  }
}