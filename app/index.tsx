import { View, Text, Image, Pressable, useWindowDimensions } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/palette";

export default function Home() {
  const { width, height } = useWindowDimensions();
  // Hero alto: 92% de la ventana, mínimo 560px
  const heroHeight = Math.max(560, Math.floor(height * 0.92));
  const isMobile = width < 900;

  // Helper para formar filas de 2 (simétrico en desktop)
  const chunks = <T,>(arr: T[], size: number) => {
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  };

  const HIGHLIGHTS = [
    { icon: "🎧", k: "Audio espacial", v: "Inmersión 3D" },
    { icon: "✋", k: "Motores hápticos", v: "16 puntos por mano" },
    { icon: "🔋", k: "Autonomía", v: "Hasta 10 horas" },
    { icon: "📶", k: "Conectividad", v: "Bluetooth 5.3 + BLE" },
  ];

  return (
    <View style={{ paddingTop: 24 }}>
      {/* HERO full viewport (imagen fondo + texto encima + degradado) */}
      <View
        style={{
          position: "relative",
          width: "100%",
          height: heroHeight,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: "hidden",
          borderRadius: 18,
          marginBottom: 24,
          backgroundColor: colors.surface,
        }}
      >
        {/* Imagen de fondo */}
        <Image
          accessibilityLabel="Persona usando guantes con tecnología háptica"
          source={{ uri: "https://picsum.photos/1600/900" }}
          resizeMode="cover"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        />

        {/* Capa oscura para legibilidad */}
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.28)",
            zIndex: 1,
          }}
        />

        {/* Texto + CTAs (encima de la imagen y del degradado) */}
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 16,
            zIndex: 3,
          }}
        >
          <View style={{ maxWidth: 900, alignItems: "center" }}>
            <Text
              style={{
                color: colors.text,
                fontSize: isMobile ? 36 : 44,
                lineHeight: isMobile ? 40 : 48,
                fontWeight: "900",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Guantes Hápticos
            </Text>
            <Text
              style={{
                color: colors.muted,
                fontSize: isMobile ? 14 : 16,
                lineHeight: isMobile ? 20 : 24,
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              Navega y juega con guía por vibración y{" "}
              <Text style={{ fontWeight: "900", color: colors.accent }}>
                audio espacial 3D
              </Text>
              . Diseñado para accesibilidad real e inmersiva.
            </Text>

            {/* CTAs */}
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/pricing" asChild>
                <Pressable
                  accessibilityRole="button"
                  style={{
                    backgroundColor: colors.primary,
                    paddingVertical: 12,
                    paddingHorizontal: 18,
                    borderRadius: 12,
                    marginRight: 10,
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: "#0B0B10", fontWeight: "900" }}>
                    Comprar / Reservar
                  </Text>
                </Pressable>
              </Link>

              <Link href="/specs" asChild>
                <Pressable
                  accessibilityRole="button"
                  style={{
                    backgroundColor: "transparent",
                    paddingVertical: 12,
                    paddingHorizontal: 18,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: colors.border,
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: colors.text, fontWeight: "800" }}>
                    Ver especificaciones
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>

        {/* Degradado inferior (encima de la imagen, debajo del texto) */}
        <LinearGradient
          pointerEvents="none"
          colors={["transparent", "rgba(11,11,16,0.65)", colors.bg]}
          locations={[0, 0.6, 1]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: Math.min(260, Math.floor(heroHeight * 0.45)),
            zIndex: 2, // debajo del texto (3), encima de la imagen (0/1)
          }}
        />
      </View>

      {/* HIGHLIGHTS simétricos: 2 por fila en desktop, 1 por fila en móvil */}
      <View style={{ marginBottom: 16 }}>
        {chunks(HIGHLIGHTS, isMobile ? 1 : 2).map((row, idxRow) => (
          <View
            key={`row-${idxRow}`}
            style={{
              flexDirection: "row",
              justifyContent: isMobile ? "flex-start" : "space-between",
              marginBottom: 12,
              flexWrap: "wrap",
            }}
          >
            {row.map((i, idxCol) => (
              <View
                key={i.k}
                style={{
                  backgroundColor: colors.overlay,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 12,
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  // Ancho controlado para simetría
                  width: isMobile ? "100%" : "49%",
                  marginRight: isMobile ? 0 : idxCol === 0 ? 0 : 0, // sin margen lateral extra, 'space-between' ya separa
                  marginBottom: 0,
                }}
              >
                <Text style={{ color: colors.muted, fontSize: 12, marginBottom: 4 }}>
                  {i.icon} {i.k}
                </Text>
                <Text style={{ color: colors.text, fontWeight: "900", fontSize: 16 }}>
                  {i.v}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
