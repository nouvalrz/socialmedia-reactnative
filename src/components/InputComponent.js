import React from "react";
import { Icon } from "react-native-elements";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";

export const InputComponent = (props) => {
  const { title, isPassword, iconName } = props;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.textBlack}>{title}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor={"grey"}
          style={styles.input}
          {...props}
        />
        {
          isPassword ?
            <View style={styles.iconContainer}>
              <View style={styles.iconContainer}>
                <TouchableOpacity {...props}>
                  <Icon name={iconName} type='ionicon'
                    size={22} />
                </TouchableOpacity>
              </View>
            </View> : null

        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textBlack: {
    color: 'black'
  },
  mainContainer: {
    marginBottom: 8,
  },
  titleContainer: {
    marginLeft: 16
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 20,
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'space- between',
    alignItems: 'center'
  },
  input: {
    padding: 8,
    flex: 1,
    color: "black"
  },
  iconContainer: {
    padding: 8
  }
});