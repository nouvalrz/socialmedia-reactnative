import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import React from 'react'
import { Icon } from 'react-native-elements'
import { data } from '../../data/Data'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const HomeScreen = () => {

  const [modifiedData, setModifiedData] = useState([]);

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
      }}
    >
      <Text>Swipe down to close</Text>
    </View>
  );

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);


  const likePhoto = (id, likeStatus) => {
    const likeStatusChanged = modifiedData.map((item) => {
      if (id === item.id) {
        item.likeStatus = !likeStatus
      }
      return item
    })
    setModifiedData(likeStatusChanged)
  }


  useEffect(() => {
    const newData = data.map((item) => {
      item.likeStatus = false
      return item
    })
    setModifiedData(newData)
  }, [])


  return (
    <View>
      <FlatList
        data={modifiedData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => {
          return (
            <View style={styles.mainContainer}>
              <View style={styles.topContainer}>
                <Image style={styles.profilePicture} source={{ uri: item.profilePicture }} />
                <View style={styles.normalMarginLeft}>
                  <Text style={styles.text} >{item.username}</Text>
                </View>
              </View>
              <Image style={styles.image} source={{ uri: item.imageLink }} />
              <View style={styles.captionContainer}>
                <Text style={styles.text}>
                  {item.username} </Text>
                <Text style={styles.caption}>
                  {item.caption}
                </Text>
              </View>
              <View style={styles.bottomContainer}>
                <TouchableOpacity
                  onPress={() => likePhoto(item.id, item.likeStatus)}
                  style={styles.horizontalContainer}>
                  <Icon name={item.likeStatus ? 'heart' : 'heart-o'}
                    type='font-awesome' size={20} color={item.likeStatus ? 'red' : null}
                  />
                  <View style={styles.normalMarginLeft}>
                    {
                      item.likeStatus ?
                        <Text style={{ color: 'black' }}>Unlike</Text> :
                        <Text style={{ color: 'black' }}>Like</Text>
                    }
                  </View>
                </TouchableOpacity>
                <BottomSheetModalProvider>
                  <TouchableOpacity style={styles.horizontalContainer} onPress={handlePresentModalPress}>

                    <Icon name='comments-o'
                      type='font-awesome' size={20}
                    />
                    <View style={styles.normalMarginLeft}>
                      <Text style={{ color: 'black' }}>Comment</Text>
                    </View>
                  </TouchableOpacity>
                  <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                  >
                    <View style={{ height: 500, width: 100, backgroundColor: 'red' }}>
                      <Text>Awesome 🎉</Text>
                    </View>
                  </BottomSheetModal>
                </BottomSheetModalProvider>
              </View>
            </View>

          )
        }}
      />
    </View >
  )
}

const styles = StyleSheet.create({
  flatListContainer: {
    padding: 8
  },
  mainContainer: {
    backgroundColor: 'white',
    margin: 8,
    borderRadius: 10
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 100
  },
  normalMarginLeft: {
    marginLeft: 8
  },
  image: {
    width: '100%',
    height: 300
  },
  captionContainer: {
    margin: 8,
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'justify',
    color: 'black'
  },
  caption: {
    fontWeight: 'normal',
    color: 'black'
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 8
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default HomeScreen