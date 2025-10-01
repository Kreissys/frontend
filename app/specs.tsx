import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import Section from "../components/Section";
import SpecCard from "../components/SpecCard";
import { getProduct } from "../services/api";
import { colors } from "../theme/palette";

type Spec = { id: number; name: string; value: string; order?: number };
type Product = { name: string; hero_image?: string; specs?: Spec[] };

export default function Specs() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct()
      .then((p) => setProduct(p))
      .finally(() => setLoading(false));
  }, []);

  const specs = (product?.specs || []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const isEmpty = !loading && specs.length === 0;

  return (
    <View style={{ gap: 20, paddingTop: 20 }}>
      {/* Encabezado visual */}
      {product?.hero_image ? (
        <Image
          accessibilityLabel={`Imagen del producto ${product.name}`}
          source={{ uri: product.hero_image }}
          style={{
            width: "100%",
            height: 260,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        />
      ) : null}

      <Section title="Especificaciones" subtitle="Hardware, conectividad y compatibilidad">
        {loading && (
          <Text style={{ color: colors.muted }}>Cargando especificaciones…</Text>
        )}

        {isEmpty && (
          <View
            style={{
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 12,
              padding: 16,
            }}
          >
            <Text style={{ color: colors.text, fontWeight: "800", marginBottom: 6 }}>
              Aún no hay especificaciones
            </Text>
            <Text style={{ color: colors.muted }}>
              Agrega datos desde el panel de administración o carga el seed actualizado.
            </Text>
          </View>
        )}

        {!loading && !isEmpty && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            {specs.map((s) => (
              <View key={s.id} style={{ width: "100%", maxWidth: 360, flex: 1 }}>
                <SpecCard name={s.name} value={s.value} />
              </View>
            ))}
          </View>
        )}
      </Section>
    </View>
  );
}
