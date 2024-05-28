// implement password reset
import React, {useState} from "react";
import {Image, StatusBar, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator} from "react-native";
import CustomBox from "react-native-customized-box";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";



const ForgetPassword: React.FC = () =>{
    let {loading, error,} = useSelector((state: RootState) => state.auth)
    const [emailError, setEmailError] = useState("");
    const [email, setEmail] = useState("");

    const confirmUser = () =>{

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
            {error ? (
                <View style={styles.errorCard}>
                    <TouchableOpacity
                        style={styles.cross}
                        onPress={() => {
                            error = null;
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
            {/* Login Button */}
            <TouchableOpacity
                style={styles.resetbtnBox}
                onPress={confirmUser}
            >
                <Text style={styles.resetbtn}>Send Password Reset Mail</Text>
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
        backgroundColor: "#f1d15f",
        width: 300,
        height: 50,
        borderRadius: 40,
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
});