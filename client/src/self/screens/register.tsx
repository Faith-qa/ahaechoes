import React, {useState} from "react";
import customBox from "react-native-customized-box"
import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "../../store/store";
import {registerUser} from "../../store/auth/auth.actions";
import {ScrollView, StatusBar, View, Image, Text, TouchableOpacity, ActivityIndicator, StyleSheet} from "react-native";
import CustomBox from "react-native-customized-box";
import Home from "./home";
import LogIn from "./logIn";
import {setRegistered} from "../../store/auth/auth.slice";

const SignUp: React.FC =() =>{
    const {loading, userInfo, registered, error, success} = useSelector((state:RootState)=> state.auth)
    const [errorMessage, setErrorMessage] = useState("")
    const [userDetails, setUserDetails] = useState(userInfo)
    const [geterror, setError] = useState(error)
    const dispatch = useDispatch<AppDispatch>()


    //login page


    if(registered){
        return (<LogIn/>)
    }
    const registerFunction = async () => {
        //handle registration
        if (userDetails.email != '' &&
            userDetails.password != '' && userDetails.firstName != '' &&
            userDetails.lastName != '') {
            await dispatch(registerUser(userDetails))


        }
        if (userDetails.email === "") setErrorMessage("This is required")
        if (userDetails.firstName === "") setErrorMessage("This is required");
        if(userDetails.lastName === "") setErrorMessage("This is required");
        if(userDetails.password === "")setErrorMessage("This is required");


    }
    return (
        <View style={{ backgroundColor: "white" }}>
            <StatusBar barStyle="light-content" />
            <ScrollView style={{ paddingTop: 20 }}>
                <View style={styles.container}>
                    <Image
                        style={styles.myLogo}
                        source={require('./../../../assets/logo.png')}
                    />
                    <Text style={styles.header}>Create Account for Free!</Text>
                    <Image
                        style={styles.registerImage}
                        source={{
                            uri: "https://raw.githubusercontent.com/hirishu10/my-assets/main/register.png",
                        }}
                    />
                    {geterror != null ? (
                        <View style={styles.errorCard}>
                            <TouchableOpacity
                                style={styles.cross}
                                onPress={() => {
                                    setError(null);
                                }}
                            >
                                <Text style={{ color: "white", fontWeight: "bold" }}>X</Text>
                            </TouchableOpacity>
                            <Text style={styles.errorCardText}>{errorMessage}</Text>
                        </View>
                    ) : null}
                    {/* UserId */}

                    {/* First Name */}
                    <CustomBox
                        placeholder={"First Name"}
                        boxColor={"#8AA6B5"}
                        focusColor={"#e07964"}
                        boxStyle={{ borderRadius: 40, borderWidth: 2 }}
                        inputStyle={{
                            fontWeight: "bold",
                            color: "#365B6D",
                            paddingLeft: 20,
                            borderRadius: 40,
                        }}
                        labelConfig={{
                            text: "First Name",
                            style: {
                                color: "#365B6D",
                                fontWeight: "bold",
                                fontFamily: "Raleway_400Regular"
                            },
                        }}
                        requiredConfig={
                            {
                                text: errorMessage,
                                style: {
                                    marginBottom: 10,
                                }

                            }
                        }
                        values={userDetails.firstName}
                        onChangeText={(value:string) => {
                            setUserDetails(prevState =>({
                                ...prevState,
                                firstName: value
                            }));
                            setError(null);
                            setErrorMessage("");
                        }}
                    />
                    {/* Last Name */}
                    <CustomBox
                        placeholder={"Last Name"}
                        boxColor={"#8AA6B5"}
                        focusColor={"#e07964"}
                        boxStyle={{ borderRadius: 40, borderWidth: 2 }}
                        inputStyle={{
                            fontWeight: "bold",
                            color: "#365B6D",
                            paddingLeft: 20,
                            borderRadius: 40,
                        }}
                        labelConfig={{
                            text: "Last Name",
                            style: {
                                color: "#365B6D",
                                fontWeight: "bold",
                                fontFamily: "Raleway_400Regular"
                            },
                        }}
                        requiredConfig={
                            {
                                text: errorMessage,
                                style: {
                                    marginBottom: 10,
                            }}
                        }
                        values={userDetails.lastName}
                        onChangeText={(value) => {
                            setUserDetails(prevState =>({
                                ...prevState,
                                lastName: value
                            }));
                            setError(null);
                            setErrorMessage("");
                        }}
                    />
                    {/*preferred name */}

                    {/* Email Id */}
                    <CustomBox
                        placeholder={"Email"}
                        boxColor={"#8AA6B5"}
                        focusColor={"#e07964"}
                        //type={"email"}
                        boxStyle={{ borderRadius: 40, borderWidth: 2 }}
                        inputStyle={{
                            fontWeight: "bold",
                            color: "#365B6D",
                            paddingLeft: 20,
                            borderRadius: 40,
                        }}
                        labelConfig={{
                            text: "Email",
                            style: {
                                color: "#365B6D",
                                fontWeight: "bold",
                                fontFamily: "Raleway_400Regular"
                            },
                        }}
                        requiredConfig={{
                            text: errorMessage,
                            style: {
                                marginBottom: 10,
                            },
                        }}
                        values={userDetails.email}
                        onChangeText={(value) => {
                            setUserDetails((prevState => ({
                                ...prevState,
                                email:value
                            })));
                            setError(null);
                            setErrorMessage("");
                        }}
                    />
                    {/* Password */}
                    <CustomBox
                        placeholder={"Password"}
                        boxColor={"#8AA6B5"}
                        focusColor={"#e07964"}
                        boxStyle={{ borderRadius: 40, borderWidth: 2 }}
                        inputStyle={{
                            fontWeight: "bold",
                            color: "#365B6D",
                            paddingLeft: 20,
                            borderRadius: 40,
                            overflow: "hidden",
                        }}
                        labelConfig={{
                            text: "Password",
                            style: {
                                color: "#365B6D",
                                fontWeight: "bold",
                                fontFamily: "Raleway_400Regular"
                            },
                        }}
                        toggle={true}
                        requiredConfig={{
                            text: errorMessage,
                            style: {
                                marginBottom: 10,
                            },
                        }}
                        values={userDetails.password}
                        onChangeText={(value) => {
                            setUserDetails(prevState => ({
                                ...prevState,
                                password: value
                            }));
                            setError(null);
                            setErrorMessage("");
                        }}
                    />
                    {/* Login Button */}
                    <TouchableOpacity
                        style={styles.registerbtn}
                        onPress={registerFunction}
                    >
                        <Text style={styles.registerBtnText}>Sign up</Text>
                        {loading && (
                            <ActivityIndicator color={"white"} />
                        )}
                    </TouchableOpacity>
                    <View style={styles.createAccount}>
                        <Text style={styles.createAccountText}>
                            {`Have an Account? `}
                        </Text>
                        <TouchableOpacity
                            style={styles.registerBtn}
                            onPress={() => dispatch(setRegistered(true))}
                        >
                            <Text style={styles.registerBtnText2}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
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
    registerImage: {
        marginTop: 20,
        width: 200,
        height: 200,
    },
    myLogo: {
        width: 100,
        height: 70,
        borderRadius: 40,
        left: 150,
        marginBottom: 20,
    },
    header: {
        fontSize: 25,
    },
    registerbtn: {
        marginTop: 10,
        backgroundColor: "#8AA6B5",
        width: 300,
        height: 50,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50,
        flexDirection: "row",
    },
    registerBtnText: {
        color: "white",
        fontSize: 22,
    },
    createAccount: {
    marginTop: 0,
        width: 280,
        height: 20,
        flexDirection: "row",
},
    createAccountText: {
        color: "#365B6D",
        fontFamily: "Raleway_600SemiBold"
    },
    registerBtn: {},
    registerBtnText2: {
        color: "#e65c40",
        textDecorationLine: "underline",
        fontFamily: "Raleway_600SemiBold"

    }
});

export default SignUp;

