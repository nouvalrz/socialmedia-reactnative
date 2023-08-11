import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { InputComponent } from '../components/InputComponent'
import { ButtonComponent } from '../components/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import { createProfile } from '../../store/actions/profileAction'

const RegisterScreen = (props) => {
  const { navigation } = props
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [isPassVisible, setIsPassVisible] = useState(false)

  const [
    isEmailFormat,
    setIsEmailFormat
  ] = useState(true);

  const globalProfileData = useSelector(store => store.profileReducer)

  const onChangeInput = (inputType, value) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (inputType == 'email') {
      if (!emailRegex.test(value)) {
        setIsEmailFormat(false);
      } else {
        setIsEmailFormat(true);
      }
    }
    setForm({
      ...form,
      [inputType]: value //for replacing respective new value
    })
  }

  const sendData = () => {
    if (form.username === '' || form.email === '' || form.password === '' || !isEmailFormat) {
      alert("Penuhi semua data dengan benar!")
    } else {
      dispatch(createProfile(form))
      Alert.alert(
        "Success",
        "Successfully create an account!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login")
          }
        ]
      )
    }
  }

  useEffect(() => {
    console.log('GLOBAL STATE ON REGISTER PAGE');
    console.log(globalProfileData)
  }, [globalProfileData])

  useEffect(() => {
    console.log('LOCAL STATE');
    console.log('all: ' + JSON.stringify(form));
    console.log('username: ' + form.username);
    console.log('email: ' + form.email);
    console.log('password: ' + form.password);
  }, [form]);

  useEffect(() => {
    if (form.email === '') {
      setIsEmailFormat(true);
    }
  }, [form.email]);

  // useEffect(() => {
  //   dispatch(createProfile({
  //     username: "nouvalrz",
  //     email: "nouvalr@gmail.com",
  //     password: "pass123",
  //   }))
  // }, [])

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.mainContainer}>
        <View style={styles.inputContainer}>
          <InputComponent
            title="Username"
            placeholder="Username"
            onChangeText={
              (text) => onChangeInput('username', text)
            }
          />
          <InputComponent
            title="Email"
            placeholder="Email"
            onChangeText={
              (text) => onChangeInput('email', text)
            }
          />
          {
            isEmailFormat ? null :
              <View style={styles.warningContainer}>
                <Text style={styles.warning}>Please input the right email format!</Text>
              </View>
          }
          <InputComponent
            title="Password"
            placeholder="Password"
            onChangeText={
              (text) => onChangeInput('password', text)
            }
            isPassword={true}
            secureTextEntry={isPassVisible ? false : true}
            iconName={isPassVisible ? 'eye-off' : 'eye'}
            onPress={() => setIsPassVisible(!isPassVisible)}
          />
        </View>
        <ButtonComponent
          text="Register"
          onPress={() => sendData()}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.registerText}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1
  },
  mainContainer: {
    backgroundColor: "#E6E6FA",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  imageContainer: {
    marginTop: 32,
    marginBottom: 16
  },
  image: {
    width: 180,
    height: 180
  },
  inputContainer: {
    padding: 16,
    width: "100%"
  },
  textContainer: {
    flexDirection: "row",
    marginTop: 16
  },
  text: {
    fontSize: 16,
    color: 'black'
  },
  registerText: {
    color: "#1A5B0A",
    fontSize: 16
  },
  warningContainer: {
    marginBottom: 16,
    marginLeft: 16
  },
  warning: {
    color: 'red'
  }
});

export default RegisterScreen