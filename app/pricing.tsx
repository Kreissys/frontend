import { useEffect, useMemo, useState } from "react";
import { View, Text, Image } from "react-native";
import { colors } from "../theme/palette";
import { getProduct } from "../services/api";
import PriceCard from "../components/PriceCard";

type Tier = {
  id: number;
  name: string;
  price_usd: string | number;
  features: string;
  is_most_popular?: boolean;
};

export default function Pricing() {
  const [tiers, setTiers] = useState<Tier[] | null>(null);

  // Imagen temporal con seed aleatorio para que cambie en cada recarga
  const seed = useMemo(() => Math.floor(Math.random() * 100000), []);
  const sideImage = `https://picsum.photos/seed/${seed}/600/900`;

  useEffect(() => {
    getProduct()
      .then((p) => setTiers(p?.prices || []))
      .catch(() => setTiers([]));
  }, []);

  const isLoading = tiers === null;
  const list = (tiers || []).map((t) => ({
    ...t,
    featuresList: (t.features || "").split("\n").filter(Boolean),
    price: Number(t.price_usd || 0),
  }));

  // Ordenar dejando primero el más popular
  list.sort((a, b) => (b.is_most_popular ? 1 : 0) - (a.is_most_popular ? 1 : 0));

  return (
    <View style={{ paddingTop: 24 }}>
      {/* Título */}
      <Text
        style={{
          color: colors.text,
          fontSize: 36,
          fontWeight: "900",
          marginBottom: 6,
        }}
      >
        Precios
      </Text>
      <Text style={{ color: colors.muted, marginBottom: 20 }}>
        Elige el plan que se ajusta a tus necesidades. Sin letras pequeñas.
      </Text>

      {/* Layout de 2 columnas */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "stretch", // 🔑 ambas columnas mismo alto
          flexWrap: "wrap", // en móvil se apilan
          gap: 20,
        }}
      >
        {/* Columna izquierda: lista de precios */}
        <View style={{ flex: 1, minWidth: 280 }}>
          {isLoading && (
            <Text style={{ color: colors.muted }}>Cargando precios…</Text>
          )}

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
              <Text
                style={{ color: colors.text, fontWeight: "800", marginBottom: 6 }}
              >
                Aún no hay planes configurados
              </Text>
              <Text style={{ color: colors.muted }}>
                Cárgalos desde{" "}
                <Text style={{ fontWeight: "800", color: colors.text }}>
                  /admin
                </Text>{" "}
                o usando la fixture.
              </Text>
            </View>
          )}

          {list.map((tier) => (
            <View key={tier.id} style={{ marginBottom: 16 }}>
              <PriceCard
                name={tier.name}
                price={tier.price}
                features={tier.featuresList}
                highlight={!!tier.is_most_popular}
              />
            </View>
          ))}
        </View>

        {/* Columna derecha: imagen que abarca todo el alto */}
        <View
          style={{
            width: 340,
            maxWidth: "100%",
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 16,
            overflow: "hidden",
            alignSelf: "stretch", // 🔑 ocupa mismo alto que la columna de precios
          }}
        >
          <Image
            accessibilityLabel="Mockup del producto"
            source={{ uri: sideImage }}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%", // 🔑 llena toda la altura disponible
            }}
          />
        </View>
      </View>

      {/* Nota de confianza */}
      <View
        style={{
          backgroundColor: colors.overlay,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 12,
          padding: 14,
          marginTop: 20,
        }}
      >
        <Text style={{ color: colors.muted }}>
          ✅ 30 días de garantía y soporte por correo. Cancelación sin penalidad durante la preventa.
        </Text>
      </View>
    </View>
  );
}
