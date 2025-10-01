import { useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Link, usePathname } from "expo-router";
import { colors } from "../theme/palette";
import { useWindowDimensions } from "react-native";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/specs", label: "Especificaciones" },
  { href: "/pricing", label: "Precios" },
  { href: "/purpose", label: "Para qué sirve" },
  { href: "/creators", label: "Creadores" },
  { href: "/live", label: "En vivo" },
];

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href} asChild>
      <Pressable
        accessibilityRole="link"
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        style={{
          paddingVertical: 8,
          paddingHorizontal: 10,
          borderRadius: 10,
          backgroundColor: hovered ? colors.overlay : "transparent",
          borderWidth: active ? 1 : 0,
          borderColor: active ? colors.border : "transparent",
        }}
      >
        <Text
          style={{
            color: active ? colors.text : colors.muted,
            fontWeight: active ? "800" : "600",
            letterSpacing: 0.3,
          }}
        >
          {label}
        </Text>
      </Pressable>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const isMobile = width < 900;
  const [menuOpen, setMenuOpen] = useState(false);

  const current = useMemo(() => {
    // marca activo si coincide exactamente o si es ruta descendiente
    return (href: string) => pathname === href || (href !== "/" && pathname?.startsWith(href));
  }, [pathname]);

  return (
    <View
      style={{
        height: 64,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Marca / Logotipo textual */}
      <Link href="/" asChild>
        <Pressable accessibilityRole="link">
          <Text
            style={{
              color: colors.text,
              fontSize: 18,
              fontWeight: "900",
              letterSpacing: 0.5,
            }}
          >
            Guantes Hápticos
          </Text>
        </Pressable>
      </Link>

      {/* Navegación */}
      {!isMobile ? (
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          {NAV.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} active={current(item.href)} />
          ))}

          {/* CTA */}
          <Link href="/pricing" asChild>
            <Pressable
              accessibilityRole="button"
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 10,
                paddingHorizontal: 14,
                borderRadius: 12,
                marginLeft: 6,
              }}
            >
              <Text style={{ color: "#0b0b0f", fontWeight: "900" }}>Comprar / Reservar</Text>
            </Pressable>
          </Link>
        </View>
      ) : (
        // Mobile: botón de menú
        <View>
          <Pressable
            accessibilityRole="button"
            onPress={() => setMenuOpen((v) => !v)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.surface,
            }}
          >
            <Text style={{ color: colors.text, fontWeight: "800" }}>
              {menuOpen ? "Cerrar" : "Menú"}
            </Text>
          </Pressable>

          {menuOpen && (
            <View
              // dropdown simple
              style={{
                position: "absolute",
                right: 0,
                top: 48,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 12,
                padding: 8,
                gap: 4,
                width: 220,
              }}
            >
              {NAV.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={current(item.href)}
                />
              ))}
              <Link href="/pricing" asChild>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setMenuOpen(false)}
                  style={{
                    backgroundColor: colors.primary,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    borderRadius: 10,
                    marginTop: 6,
                  }}
                >
                  <Text style={{ color: "#0b0b0f", fontWeight: "900" }}>Comprar / Reservar</Text>
                </Pressable>
              </Link>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
