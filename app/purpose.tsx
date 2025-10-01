import { useEffect, useMemo, useState } from "react";
import { View, Text, Image } from "react-native";
import { colors } from "../theme/palette";
import { getProduct } from "../services/api";

type UseCase = { id: number; title: string; body: string };

export default function Purpose() {
  const [items, setItems] = useState<UseCase[] | null>(null);

  useEffect(() => {
    getProduct()
      .then((p) => setItems(p?.use_cases || []))
      .catch(() => setItems([]));
  }, []);

  const isLoading = items === null;
  const list = (items || []).slice();

  // Genera una imagen distinta por tarjeta (Picsum + seed)
  const imgFor = (seed: number) => `https://picsum.photos/seed/purpose_${seed}/800/600`;

  // Helper: divide el array en filas de 2 en desktop (1 en móvil se apila solo)
  const chunk2 = <T,>(arr: T[]) => {
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += 2) out.push(arr.slice(i, i + 2));
    return out;
  };

  return (
    <View style={{ paddingTop: 24 }}>
      <Text
        style={{
          color: colors.text,
          fontSize: 36,
          fontWeight: "900",
          marginBottom: 6,
        }}
      >
        ¿Para qué sirve?
      </Text>
      <Text style={{ color: colors.muted, marginBottom: 20 }}>
        Casos de uso reales: navegación accesible, juego inmersivo y entrenamiento guiado.
      </Text>

      {isLoading && <Text style={{ color: colors.muted }}>Cargando casos de uso…</Text>}

      {!isLoading && list.length === 0 && (
        <View
          style={{
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <Text style={{ color: colors.text, fontWeight: "800", marginBottom: 6 }}>
            Aún no hay casos de uso
          </Text>
          <Text style={{ color: colors.muted }}>
            Agrega algunos desde <Text style={{ color: colors.text, fontWeight: "800" }}>/admin</Text>
            {" "}o usa la fixture actualizada.
          </Text>
        </View>
      )}

      {/* Grid: 2 por fila en pantallas anchas, 1 en móvil (se apila solo) */}
      {chunk2(list).map((row, idxRow) => (
        <View
          key={`row-${idxRow}`}
          style={{
            flexDirection: "row",
            alignItems: "stretch",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 16,
          }}
        >
          {row.map((uc) => (
            <View
              key={uc.id}
              style={{
                flex: 1,
                minWidth: 280,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              {/* Imagen superior */}
              <Image
                accessibilityLabel={`Imagen ilustrativa: ${uc.title}`}
                source={{ uri: imgFor(uc.id) }}
                resizeMode="cover"
                style={{ width: "100%", height: 200, borderBottomWidth: 1, borderBottomColor: colors.border }}
              />
              {/* Contenido */}
              <View style={{ padding: 14 }}>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 18,
                    fontWeight: "900",
                    marginBottom: 6,
                  }}
                >
                  {uc.title}
                </Text>
                <Text style={{ color: colors.muted, lineHeight: 20 }}>{uc.body}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
