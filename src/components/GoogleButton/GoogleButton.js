import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import * as STRINGS from "../../constants/strings";

function GoogleButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-slate-100 shadow-sm w-full rounded-md py-4 flex flex-row justify-center items-center"
    >
      <Icon
        name="google"
        size={20}
        color="#eb3448"
        style={{ marginRight: 10 }}
      />
      <Text className="text-lg text-red-500 ">{STRINGS.signInGoogle}</Text>
    </TouchableOpacity>
  );
}

export default GoogleButton;
