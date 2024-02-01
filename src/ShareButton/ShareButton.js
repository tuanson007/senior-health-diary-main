import { View } from "react-native";
import * as COLORS from "../constants/colors";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as STRINGS from "../constants/strings";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
function ShareButton({ name, reason, symptoms, revention, description, date }) {
  const shareHealthLog = async () => {
    try {
      let pdfContent = "";
      if (name !== "") {
        pdfContent += "Tên bệnh: " + name + "\n";
      }
      if (reason !== "") {
        pdfContent += "Nguyên nhân: " + reason + "\n";
      }
      if (symptoms !== "") {
        pdfContent += "Triệu chứng: " + symptoms + "\n";
      }
      if (revention !== "") {
        pdfContent += "Cách phòng tránh: " + revention + "\n";
      }
      if (description !== "") {
        pdfContent += "Mô tả chi tiết: " + description + "\n";
      }
      if (date !== "") {
        pdfContent += "\nNgày: " + date + "\n";
      }
      const path = `${FileSystem.documentDirectory}HealthyLog.pdf`;
      await FileSystem.writeAsStringAsync(path, pdfContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      await Sharing.shareAsync(path, {
        mimeType: "application/pdf",
        dialogTitle: STRINGS.shareHealthLog,
      });
    } catch (error) {
      console.error("Error sharing health log:", error.message);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={shareHealthLog}>
        <Icon name="share" size={20} color={COLORS.main} />
      </TouchableOpacity>
    </View>
  );
}

export default ShareButton;
