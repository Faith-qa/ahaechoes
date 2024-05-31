// implement password reset
import React, {useEffect, useState} from "react";
import {
    Image,
    StatusBar,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    Pressable
} from "react-native";
import CustomBox from "react-native-customized-box";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import LogIn from "./logIn";
import {validateExistingUser, updatePassword} from "../../store/auth/auth.actions";
import {resetError, setForgotPassword, setUserExist} from "../../store/auth/auth.slice";
import {Ionicons} from "@expo/vector-icons";



const ForgetPassword: React.FC = () =>{
    let {loading, error,userExist, forgotPassword} = useSelector((state: RootState) => state.auth)
    const [emailError, setEmailError] = useState("");
    const [email, setEmail] = useState("");
    const [Error, setError] = useState(error)
    const dispatch = useDispatch<AppDispatch>();
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword]=useState("")
    const [passwordError, setPasswordError] = useState("")




    if (!forgotPassword){
        return(<LogIn/>)
    }


    const confirmUser = async() =>{
        if (email !== ""){
            await dispatch(validateExistingUser(email))
        }
        if (email === "") setEmailError("This is required");
    }

    const PasswordUpdate = async()=>{
        if (newPassword !== "" && newPassword === repeatNewPassword){
            console.log('well done')
            const data = {
                email: email,
                newPassword: newPassword
            }
            await dispatch(updatePassword(data))
        }
        if (newPassword === "" || repeatNewPassword === ""){
            setPasswordError("this is required")
        }
        if (repeatNewPassword !== newPassword){
            setPasswordError("passwords don't match")
        }
    }
    if (userExist){
        return(
            <Modal
                visible={userExist}
            transparent={true}>
                <View style={{ margin: 20, padding: 10, height: "20%", width: "100%",
                alignSelf: 'center', alignItems: "center"}}>
                    <Pressable  onPress={()=>{
                        dispatch(setUserExist(false))
                    }}>
                        <Ionicons name="arrow-back-circle-outline" size={24} color="black" />
                    </Pressable>
                <CustomBox
                    placeholder={"Password"}
                    focusColor={"#f1d15f"}
                    boxStyle={{ borderRadius: 40, borderWidth: 2 }}
                    inputStyle={{
                        fontWeight: "bold",
                        color: "#30302e",
                        paddingLeft: 20,
                        borderRadius: 40,
                    }}
                    labelConfig={{
                        text: "NewPassword",
                        style: {
                            color: "#0e0e21",
                            fontWeight: "bold",
                        },
                    }}
                    requiredConfig={{
                        text: passwordError,
                        style: {
                            color: "red",
                            fontWeight: "bold",
                            fontFamily: "Raleway_600SemiBold"
                        }}}
                    values={newPassword}
                    onChangeText={(value) => {
                        setNewPassword(value);
                        error=null;
                        setPasswordError("");
                    }}
                />
                <CustomBox
                    placeholder={"Repeat Password"}
                    focusColor={"#f1d15f"}
                    boxStyle={{ borderRadius: 40, borderWidth: 2 }}
                    inputStyle={{
                        fontWeight: "bold",
                        color: "#30302e",
                        paddingLeft: 20,
                        borderRadius: 40,
                    }}
                    labelConfig={{
                        text: "Repeat Password",
                        style: {
                            color: "#0e0e21",
                            fontWeight: "bold",
                        },
                    }}
                    requiredConfig={{
                        text: passwordError,
                        style: {
                            color: "red",
                            fontWeight: "bold",
                            fontFamily: "Raleway_600SemiBold"
                        }}}
                    values={repeatNewPassword}
                    onChangeText={(value) => {
                        setRepeatNewPassword(value);
                        error=null;
                        setPasswordError("");
                    }}
                />
                <TouchableOpacity
                    style={[styles.resetbtnBox, {marginTop: 20}]}
                    onPress={PasswordUpdate}
                >
                    <Text style={styles.resetbtn}>Update Password</Text>
                    {loading && loading ? (
                        <ActivityIndicator  color={"white"} />
                    ) : null}
                </TouchableOpacity></View>


            </Modal>
        )
    }
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <Image
                style={styles.myLogo}
                source={require('../../../assets/logo.png')}/>
            <Text style={styles.header}>Forgot Password</Text>
            <Image
                style={styles.resetImage}
                source={require('../../../assets/oceanWaves.jpg')}/>
            {Error != null ? (
                <View style={styles.errorCard}>
                    <TouchableOpacity
                        style={styles.cross}
                        onPress={() => {
                            setError(null);
                        }}
                    >
                        <Text style={{ color: "white", fontWeight: "bold" }}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.errorCardText}>{error}</Text>
                </View>
            ) : null}
            <CustomBox
                placeholder={"Email"}
                focusColor={"#f1d15f"}
                boxStyle={{ borderRadius: 40, borderWidth: 2 }}
                inputStyle={{
                    fontWeight: "bold",
                    color: "#30302e",
                    paddingLeft: 20,
                    borderRadius: 40,
                }}
                labelConfig={{
                    text: "Email",
                    style: {
                        color: "#0e0e21",
                        fontWeight: "bold",
                    },
                }}
                requiredConfig={{
                    text: emailError,
                    style: {
                        color: "red",
                        fontWeight: "bold",
                        fontFamily: "Raleway_600SemiBold"
                }}}
                values={email}
                onChangeText={(value) => {
                    setEmail(value);
                    error=null;
                    setEmailError("");
                }}
            />
            <TouchableOpacity
                style={styles.forgotBtn}
                onPress={() => {
                    dispatch(setForgotPassword(false))
                    dispatch(resetError())
                }}
            >
                <Text style={styles.forgotBtnText}>Log in?</Text>
            </TouchableOpacity>
            {/* Login Button */}
            <TouchableOpacity
                style={styles.resetbtnBox}
                onPress={confirmUser}
            >
                <Text style={styles.resetbtn}>check if account exists</Text>
                {loading && loading ? (
                    <ActivityIndicator  color={"white"} />
                ) : null}
            </TouchableOpacity>
            {/* Register Button */}
            <View style={styles.createAccount}>
                <Text
                    style={styles.createAccountText}
                >{`Please provide registered Email for password reset`}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    errorCard: {
        width: 300,
        height: 50,
        backgroundColor: "#de3138",
        justifyContent: "center",
        paddingLeft: 15,
        borderRadius: 40,
    },
    errorCardText: {
        paddingLeft: 15,
        color: "white",
        fontSize: 12,
        fontWeight: "500",
        position: "absolute",
    },
    cross: {
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -20,
        left: 250,
        position: "relative",
    },
    resetImage: {
        marginTop: 20,
        width: 200,
        height: 200,
    },
    header: {
        fontSize: 25,
    },
    resetbtnBox: {
        backgroundColor: "#8AA6B5",
        width: 300,
        height: 50,
        borderRadius: 40,
        //marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    resetbtn: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
    createAccount: {
        marginTop: 10,
        width: 300,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    createAccountText: {
        color: "grey",
        fontSize: 12,
    },
    myLogo: {
        top: -30,
        width: 100,
        height: 70,
        borderRadius: 40,
        left: 150,
    },
    forgotBtn:{
        margin:10,
        width: 280,
        height: 20,
        justifyContent: "center"
    },
    forgotBtnText: {
        color: "#c29700",
        fontSize: 12,
        alignSelf: "flex-end",
        textDecorationLine: "underline",
    },
});

export default ForgetPassword;