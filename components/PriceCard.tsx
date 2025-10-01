import { View, Text, Pressable } from "react-native";
import { colors } from "../theme/palette";

export default function PriceCard({
  name,
  price,
  features,
  highlight,
}: {
  name: string;
  price: number;
  features: string[];
  highlight?: boolean;
}) {
  return (
    <View
      style={{
        backgroundColor: highlight ? "#182334" : colors.surface,
        borderWidth: 2,
        borderColor: highlight ? colors.accent : colors.border,
        borderRadius: 16,
        padding: 18,
      }}
    >
      {/* Encabezado */}
      <View style={{ marginBottom: 10 }}>
        <Text
          style={{
            color: colors.text,
            fontSize: 18,
            fontWeight: "900",
            marginBottom: 6,
          }}
        >
          {name} {highlight ? "⭐" : ""}
        </Text>
        <Text
          style={{
            color: colors.text,
            fontSize: 34,
            fontWeight: "900",
            marginBottom: 2,
          }}
        >
          ${price.toFixed(2)}
        </Text>
        <Text style={{ color: colors.muted, fontSize: 12 }}>
          Pago único · impuestos no incluidos
        </Text>
      </View>

      {/* Features */}
      <View style={{ marginTop: 8, marginBottom: 12 }}>
        {features.map((f, i) => (
          <Text key={i} style={{ color: colors.muted, marginBottom: 6 }}>
            • {f}
          </Text>
        ))}
      </View>

      {/* CTA */}
      <Pressable
        accessibilityRole="button"
        style={{
          backgroundColor: highlight ? colors.accent : colors.primary,
          paddingVertical: 12,
          paddingHorizontal: 14,
          borderRadius: 12,
          alignSelf: "flex-start",
        }}
        onPress={() => {
          // aquí podrías navegar a un checkout o abrir modal
          console.log("Comprar / Reservar →", name);
        }}
      >
        <Text
          style={{
            color: "#0B0B10",
            fontWeight: "900",
          }}
        >
          Comprar / Reservar
        </Text>
      </Pressable>
    </View>
  );
}
