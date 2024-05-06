import React, {useState} from "react";
import {StatusBar, TouchableOpacity, View, Text, Image, StyleSheet, ActivityIndicator} from "react-native";
import CustomBox from 'react-native-customized-box';
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../store/auth/auth.actions";
import {AppDispatch, RootState} from "../../store/store";
import Home from "./home";

const LogIn: React.FC = () =>{
    const {loading, error} = useSelector((state: RootState)=> state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [Error, setError] = useState(error)
    //login Validation

    const loginFunction = async () => {
        if (email !== "" && password !== "") {

            await dispatch(loginUser({email, password}))
                .then((u)=>{
                    setEmail("");
                    setPassword("");
                    <Home/>
                }).catch((err)=>{
                    setError(err);

                })
        }
        if (email === "") setEmailError("This is required");
        if (password === "") setPasswordError("this is required");

    }
    const submitForm = (email: any, password: any) =>{
        dispatch(loginUser({email, password}));
    };

    return (
        <View style={styles.container}>
        <View>
            <StatusBar barStyle="light-content" />
            <Image
                style={styles.myLogo}
                source={require('../../../assets/logo.png')}
            />
            <Text style={styles.header}>Living with Intention: 🌱</Text>
            <Image
                style={styles.loginImage}
                source={require('../../../assets/oceanSplit.jpg')}
            />
            {Error != null ? <View style={styles.errorCard}>
                <TouchableOpacity
                    style={styles.cross}
                    onPress={() => {
                        setError(null)
                    }}
                >
                    <Text style={{ color: "#365B6D", fontWeight: "bold", fontFamily:"Raleway_600SemiBold" }}>X</Text>
                </TouchableOpacity>
                <Text style={styles.errorCardText}>something went wrong</Text>
            </View>: null}
            <CustomBox
                placeholder={"Email"}
                boxColor={"#8AA6B5"}
                focusColor={"#B4D8E2"}
                keyboardType="email-address"
                boxStyle={{ borderRadius: 40, borderWidth: 2 }}
                inputStyle={{
                    fontWeight: "normal",
                    fontFamily: "Raleway_400Regular",
                    color: "#30302e",
                    paddingLeft: 20,
                    borderRadius: 40,
                }}
                labelConfig={{
                    text: "Email",
                    style: {
                        color: "#365B6D",
                        fontWeight: "bold",
                        fontFamily: "Raleway_600SemiBold"
                    },
                }}
                requiredConfig={{
                    text: emailError,
                    style: {
                        color: "red",
                        fontWeight: "bold",
                        fontFamily: "Raleway_600SemiBold"
                    },

                }}
                values={email}
                onChangeText={(value) => {
                    setEmail(value);
                    setError(null);
                    setEmailError("")
                    // Handle email input change if needed
                }}
            />
            <CustomBox
                //placeholder={""}
                toggle={true}
                boxColor={"#8AA6B5"}
                focusColor={"#e65c40"}
                boxStyle={{ borderRadius: 40, borderWidth: 2 }}
                inputStyle={{
                    fontWeight: "normal",
                    color: "#365B6D",
                    paddingLeft: 20,
                    borderRadius: 40,
                    fontFamily: "Raleway_400Regular",
                }}
                labelConfig={{
                    text: "Password",
                    style: {
                        color: "#365b6d",
                        fontWeight: "bold",
                        fontFamily: "Raleway_600SemiBold"
                    },
                }}
                requiredConfig={{
                    text: passwordError,
                    style: {
                        color: "#0e0e21",
                        fontWeight: "bold",
                        fontFamily: "Raleway_600SemiBold"
                    },

                }}
                //values={''}
                onChangeText={(value) => {
                    setPassword(value)
                    setError(null)
                    setPasswordError("")
                    // Handle password input change if needed
                }}
            />
            {/* ForgotPassword */}
            <TouchableOpacity
                style={styles.forgotBtn}
                onPress={() => {
                    // Navigate to ForgotPassword screen if needed
                }}
            >
                <Text style={styles.forgotBtnText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={loginFunction}
                //disabled={getDisabled}
            >
                <Text style={styles.loginBtnText}>LogIn</Text>
                {loading && <ActivityIndicator  color={"white"} />}
            </TouchableOpacity>

            {/* Register Button */}
            <View style={styles.createAccount}>
                <Text style={styles.createAccountText}>
                    {`Don't have an Account? `}
                </Text>
                <TouchableOpacity
                    style={styles.registerBtn}
                    onPress={() => {
                        // Navigate to Register screen if needed
                    }}
                >
                    <Text style={styles.registerBtnText}>Register for Free!</Text>
                </TouchableOpacity>
            </View>
        </View></View>
    );
};

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
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "500",
        position: "absolute",
        fontFamily: 'Raleway_400Regular_Italic'
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
    loginImage: {
        marginTop: 20,
        width: 300,
        height: 200,
    },
    header: {
        fontSize: 25,
        color: '#365b6d',
        fontFamily: "Raleway_400Regular_Italic"
    },
    loginBtn: {
        marginTop: 10,
        backgroundColor: "#8AA6B5",
        width: 300,
        height: 50,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    loginBtnText: {
        color: "white",
        fontSize: 22,
    },
    forgotBtn: {
        marginTop: 20,
        width: 280,
        height: 20,
        justifyContent: "center",
    },
    forgotBtnText: {
        color: "#c29700",
        fontSize: 12,
        alignSelf: "flex-end",
        textDecorationLine: "underline",
    },
    createAccount: {
        marginTop: 10,
        width: 280,
        height: 20,
        flexDirection: "row",
    },
    createAccountText: {
        color: "#365B6D",
        fontFamily: "Raleway_600SemiBold"
    },
    registerBtn: {},
    registerBtnText: {
        color: "#e65c40",
        textDecorationLine: "underline",
        fontFamily: "Raleway_600SemiBold"


    },
    myLogo: {
        width: 100,
        height: 70,
        borderRadius: 40,
        left: 150,
        top: 10,
        marginBottom: 10,
    },
});

export default LogIn;
