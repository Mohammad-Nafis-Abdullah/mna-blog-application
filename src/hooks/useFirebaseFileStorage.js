/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { deleteObject, ref } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { storage } from "../firebase.init";


const imgUrl = (imgName)=> {
    if (!imgName) {
        return false;
    }
    const storeName = 'tech-blogs-9511e.appspot.com';
    return `https://firebasestorage.googleapis.com/v0/b/${storeName}/o/${imgName}?alt=media`;
}
export {imgUrl};


const imageNaming = (name='')=> {
    if (!name) {
        return;
    }
    return `${Date.now()}-${name.trim().split(' ').join('-')}`;
}


const useFirebaseFileStorage = () => {
    const [uploadFile, uploading, snapshot, error] = useUploadFile();

    const uploadImage = (file=undefined) => {
        if(!file){
            console.log('no file');
            return;
        }
        return new Promise(async(resolve, reject) => {
            try {
                const uploadRef = ref(storage,imageNaming(file?.name));
                const result = await uploadFile(uploadRef, file, {
                    contentType: 'image/jpeg'
                });
                resolve(result?.metadata);
            } catch (err) {
                reject(err);
            }
        });
    };



    const deleteImage = (imgName='')=> {
        // let deleted;
        if(!imgName){
            return;
        }

        return new Promise(async(resolve, reject) => {
            try {
                const deleteRef = ref(storage, imgName);
                await deleteObject(deleteRef);
                resolve({deleted:true});
            } catch (err) {
                reject('Image not deleted');
            }
        });
    }




    return { uploadImage,deleteImage };
};

export default useFirebaseFileStorage;