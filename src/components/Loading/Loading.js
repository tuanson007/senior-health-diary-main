import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import * as STRINGS from "../../constants/strings";

const Loading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex flex-row justify-center">
      {loading ? (
        <Text>{STRINGS.loading}</Text>
      ) : (
        <Text className="text-red-500 text-center">{STRINGS.noData}</Text>
      )}
    </View>
  );
};

export default Loading;
