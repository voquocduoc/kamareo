import { db } from "./firebase";

export const updateData = (id, dataUpdate) => {
  return new Promise((resolve, reject) => {
    try {
      db.ref("stores/" + id).update(dataUpdate.store);
      db.ref("stores/" + id).update(dataUpdate.redInvoice);
      resolve("success");
    } catch (ex) {
      reject("error");
    }
  });
};

export const getStore = ( id ) => {
  return new Promise((resolve, reject) => {
    db.ref("stores/" + id).once("value").then(function(snapshot) {
      if (snapshot.val()) {
        resolve(snapshot.val());
      } else {
        reject("Error");
      }
    });
  });
};

export const getRedInvoice = ( id ) => {
  return new Promise((resolve, reject) => {
    db.ref("redInvoice/" + id).once("value").then(function(snapshot) {
      if (snapshot.val()) {
        resolve(snapshot.val());
      } else {
        reject("Error");
      }
    });
  });
};
