import {useEffect, useState} from "react";
import {pickImage} from "./handleProfilePic";
import Toast from "react-native-toast-message";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import ProfilePicScreen from "./ProfilePicScreen";
import {useDispatch} from "react-redux"
import {AppDispatch} from "../../../../store/store";
import {updateProfile} from "../../../../store/auth/auth.actions";
import {isFulfilled} from "@reduxjs/toolkit";

const ProfilePicContainer:React.FC= () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [uploadedProfile, setUploadedProfile] = useState<string|undefined>(userInfo.avatar)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const sendtoserver = async()=>{
            console.log("hello", uploadedProfile)
            if (uploadedProfile == undefined){
                return
            }
            await dispatch(updateProfile({email: userInfo.email, avatar: uploadedProfile}))

        }
        sendtoserver()
    }, []);


    // handle file upload to cloudinary
    const uploadToCloudinary = async() =>{
        let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dwwxkbeeo/upload'
        try {
            const uri = await pickImage();

            if (uri) {
                Toast.show({
                    type: 'success',
                    text1: 'Upload Successful, kindly be patient for server configurations',
                });

                let data = {
                    file: uri,
                    upload_preset: 'dwwxkbeeo'
                }

                await fetch(CLOUDINARY_URL, {
                    body: JSON.stringify(data),
                    headers: {
                        'content-type': 'application/json'
                    },
                    method: 'POST',
                }).then(async r => {
                    let data = await r.json();
                    console.log(data.url);
                    setUploadedProfile(data.url);
                    Toast.show({
                        type: 'success',
                        text1: 'Upload Successful',
                    });

                }).catch(err => console.log(err));
            }
        } catch (err: any) {
            alert(err.message);
        }
    }



    return(<ProfilePicScreen uploadedProfile={uploadedProfile} uploadToCloudinary={uploadToCloudinary}/>)
}

export default ProfilePicContainer;