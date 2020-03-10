import firebase from 'react-native-firebase';

export function getDataRequest(collection, data) {
  const stationId = firebase.auth().currentUser.uid;

  const listener = firebase
    .database()
    .ref(collection + '')
    .orderByChild('stationId/')
    .equalTo(stationId)
    .on('value', snapshot => {
      data({data: snapshot.val() || {}});
    });
}

export async function addDataRequest(collection, data) {
  await firebase
    .database()
    .ref(collection + '')
    .push(data)
    .then()
    .catch(error => {
      throw error;
    });
}

export async function setDataRequest(collection, data) {
  await firebase
    .database()
    .ref(collection + '')
    .set(data)
    .then(() => {
      console.log('set success');
    })
    .catch(error => {
      throw error;
    });
}

export async function deleteRequest(collection, data) {
  await firebase
    .database()
    .ref(collection + '' + data.id)
    .remove()
    .then()
    .catch(error => {
      throw error;
    });
}
export async function updateRequest(collection, data) {
  let id = data.id;
  delete data.id;
  await firebase
    .database()
    .ref(collection + '' + id)
    .update(data)
    .then()
    .catch(error => {
      throw error;
    });
}
