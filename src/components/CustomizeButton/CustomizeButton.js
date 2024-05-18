import { Text } from "react-native";
import * as COLORS from "../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

function CustomizeButton({ title, onPress, isSearch }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.main,
      }}
      className={`w-full items-center rounded-md shadow-sm ${
        !isSearch ? "py-4" : "py-[8px]"
      }`}
      onPress={onPress}
    >
      <Text className="text-white font-bold text-lg">{title}</Text>
    </TouchableOpacity>
  );
}

export default CustomizeButton;
