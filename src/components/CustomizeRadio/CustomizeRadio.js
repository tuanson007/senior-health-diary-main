import React, { useMemo, useState } from "react";
import { Text, TextInput, View } from "react-native";
import RadioGroup from "react-native-radio-buttons-group";

function CustomizeRadio({ options, value, onChangeText }) {
  const radioButtons = useMemo(
    () =>
      options || [
        {
          id: "1",
          label: "Option 1",
          value: "option1",
        },
        {
          id: "2",
          label: "Option 2",
          value: "option2",
        },
      ],
    []
  );

  const [selectedId, setSelectedId] = useState(value?.id || value);
  const handleChange = (data) => {
    setSelectedId(data);
    onChangeText(data);
  };
  return (
    <View>
      <RadioGroup
        containerStyle={{
          display: "flex",
          flexDirection: "row",
        }}
        radioButtons={radioButtons}
        onPress={(data) => handleChange(data)}
        selectedId={selectedId}
      />
    </View>
  );
}

export default CustomizeRadio;
