import { View, Text } from "react-native";
import { colors } from "../theme/palette";
export default function Footer(){
    return (
        <View style={{ padding: 24, borderTopWidth: 1, borderColor: colors.border }}>
            <View style={{ maxWidth: 1200, alignSelf: "center" }}>
                <Text style={{ color: colors.muted }}>© {new Date().getFullYear()} Guantes Hápticos. Todos los derechos reservados.</Text>
            </View>
        </View>
    );
}