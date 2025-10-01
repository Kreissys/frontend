import { View, Text } from "react-native";
import { colors } from "../theme/palette";

export default function SpecCard({ name, value }: { name: string; value: string }) {
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
        padding: 16,
      }}
    >
      <Text
        style={{
          color: colors.muted,
          fontSize: 12,
          letterSpacing: 0.3,
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          color: colors.text,
          fontWeight: "900",
          marginTop: 6,
          fontSize: 18,
          lineHeight: 22,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
