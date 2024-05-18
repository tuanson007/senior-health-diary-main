import React, { useState } from "react";
import { TextInput, View, TouchableOpacity, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function CustomizeTextInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  numericInput,
  isSearch,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    const formattedTime = time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setSelectedTime(time);
    hideTimePicker();
    onChangeText(formattedTime);
  };

  let keyboardType = "default";
  if (numericInput === true) {
    keyboardType = "numeric";
  } else if (numericInput === "time") {
    keyboardType = "default"; // Time picker does not need a specific keyboard type
  }
  if (isSearch) {
    return (
      <View
        style={{
          width: "100%",
          borderRadius: 10,
          borderWidth: 1,
          padding: 12,
          backgroundColor: "white",
        }}
      >
        <Image
          className="absolute top-2 left-2"
          source={require("../../../assets/images/searchIcon.png")}
          style={{ width: 25, height: 25 }}
        />
        <TextInput
          style={{ paddingLeft: 20, paddingRight: 10, height: 20 }}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          onFocus={() => numericInput === "time" && showTimePicker()}
        />
      </View>
    );
  } else
    return (
      <View
        style={{
          width: "100%",
          borderRadius: 10,
          borderWidth: 1,
          padding: 12,
          backgroundColor: "white",
        }}
      >
        <TextInput
          style={{ paddingLeft: 8, paddingRight: 10, height: 20 }}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          onFocus={() => numericInput === "time" && showTimePicker()}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{ position: "absolute", top: 12, right: 10 }}
          >
            <Icon name={isPasswordVisible ? "eye-slash" : "eye"} size={20} />
          </TouchableOpacity>
        )}
        {numericInput === "time" && (
          <TouchableOpacity
            onPress={showTimePicker}
            style={{ position: "absolute", top: 12, right: 10 }}
          >
            <Icon name="clock-o" size={20} />
          </TouchableOpacity>
        )}

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
          is24Hour={false}
        />
      </View>
    );
}

export default CustomizeTextInput;
