import { storage } from "./firebase";
export const uploadImage = (image) => {
  const imageRef = storage.ref("images");
  return new Promise((resolve) => {
    console.log(image);
    imageRef.putString(image, 'data_url').then(snapshot => snapshot.ref.getDownloadURL()).then((url) => {
      console.log(url);
      resolve(url);
    });
  });
};