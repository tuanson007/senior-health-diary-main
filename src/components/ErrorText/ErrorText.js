import { Text } from "react-native";

function ErrorText({ content }) {
  return <Text className="text-red-500">{content}</Text>;
}

export default ErrorText;
