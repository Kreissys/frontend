import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0B0B10" }}>
      {/* Header sticky */}
      <View
        style={{
          position: "sticky" as any, // sticky evita problemas de scroll en web
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(11,11,16,0.85)",
          borderBottomWidth: 1,
          borderColor: "#1F2333",
          // sombra suave
          boxShadow: "0 6px 20px rgba(0,0,0,0.25)" as any,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 1200,
            paddingHorizontal: 16,
            alignSelf: "center",
          }}
        >
          <Header />
        </View>
      </View>

      {/* Contenido scrollable */}
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          maxWidth: 1200,
          alignSelf: "center",
          paddingHorizontal: 16,
          paddingTop: 24,
          paddingBottom: 48,
        }}
        showsVerticalScrollIndicator
      >
        <Stack screenOptions={{ headerShown: false }} />
      </ScrollView>

      {/* Footer */}
      <View
        style={{
          borderTopWidth: 1,
          borderColor: "#1F2333",
          paddingVertical: 20,
          backgroundColor: "#0B0B10",
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 1200,
            paddingHorizontal: 16,
            alignSelf: "center",
          }}
        >
          <Footer />
        </View>
      </View>
    </SafeAreaView>
  );
}
