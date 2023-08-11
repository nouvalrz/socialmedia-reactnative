import { View, Text, Image, ScrollView, StyleSheet, Modal } from 'react-native'
import { ButtonComponent } from '../components/ButtonComponent'
import { InputComponent } from '../components/InputComponent'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'
import { loginUser } from '../../store/actions/profileAction'

const ProfileScreen = () => {

  const globalProfileData = useSelector(store => store.profileReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch()
  const onLogout = () => {
    setIsModalVisible(false)
    dispatch(loginUser(false))
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../../assets/images/avatar.png')} />
        </View>
        <View style={styles.inputContainer}>
          <InputComponent title="Username" editable={false} value={globalProfileData.username} />
          <InputComponent title="Email" editable={false} value={globalProfileData.email} />
          <InputComponent title="Password" editable={false} value={globalProfileData.password} />
        </View>
        <ButtonComponent text="Logout" isLogout={true} onPress={() => setIsModalVisible(true)} />
        <Modal
          animationType='slide'
          transparent={false}
          visible={isModalVisible}
          onRequestClose={() => { setIsModalVisible(!isModalVisible) }}>
          <View style={styles.backgroundView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure want to logout?
              </Text>
              <View style={styles.modalButton}>
                <ButtonComponent text='yes' onPress={() => onLogout()} />
                <ButtonComponent text='no' isLogout={true} onPress={() => { setIsModalVisible(!isModalVisible) }} />
              </View>
            </View>
          </View>


        </Modal>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    margin: 16
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black'
  },
  inputContainer: {
    padding: 16,
    width: '100%'
  },
  backgroundView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  modalView: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    width: '80%'
  },
  modalText: {
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 16,
    color: 'black'
  },
  modalButton: {
    flexDirection: 'row'
  }
})

export default ProfileScreen