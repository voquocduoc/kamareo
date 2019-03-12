import { db } from "./firebase";

export const doCreateUser = (id, infoUser) =>
  db.ref("users/" + id).update(infoUser);

export const updateProfileFB = (id, infoUser) => {
  return new Promise((resolve, reject) => {
    try {
      db.ref("users/" + id).update(infoUser);
      resolve("success");
    } catch (ex) {
      reject("error");
    }
  });
};

export const getInfoUser = ( id ) => {
  return new Promise((resolve, reject) => {
    db.ref("users/" + id).once("value").then(function(snapshot) {
      if (snapshot.val()) {
        resolve(snapshot.val());
      } else {
        reject("Error");
      }
    });
  });
};

export const onceGetUsers = () =>
  db.ref("users/").once("value");

export const addDataSales = (item, navigation) => {
  if (item.segment === 1) {
    db.ref("sales/").push(item).then((data) => {
      if (data.key) {
        Alert.alert("Thông Báo","Đăng Thành Công !");
        navigation.navigate("Home");
      } else {
        Alert.alert("Đăng Không Thành Công !");
      }
    });
  } else if (item.segment === 2) {
    db.ref("rents/").push(item).then((data) => {
      if (data.key) {
        Alert.alert("Thông Báo","Đăng Thành Công !");
        navigation.navigate("Home");
      } else {
        Alert.alert("Đăng Không Thành Công !");
      }
    });
  }
};
