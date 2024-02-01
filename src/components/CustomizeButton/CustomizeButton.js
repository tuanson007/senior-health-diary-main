import { Text } from "react-native";
import * as COLORS from "../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

function CustomizeButton({ title, onPress }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.main,
      }}
      className="w-full items-center rounded-md py-4 shadow-sm"
      onPress={onPress}
    >
      <Text className="text-white font-bold text-lg">{title}</Text>
    </TouchableOpacity>
  );
}

export default CustomizeButton;
