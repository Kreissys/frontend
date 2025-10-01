import { View, Text } from "react-native";
import { colors } from "../theme/palette";
export default function KPI({ label, value }:{ label:string; value:string|number }){
    return (
        <View style={{ backgroundColor: "#15162a", padding: 16, borderRadius: 12, borderWidth:1, borderColor: "#232545", minWidth: 160 }}>
            <Text style={{ color: colors.muted, marginBottom: 6 }}>{label}</Text>
            <Text style={{ color: colors.text, fontSize: 24, fontWeight: "900" }}>{value}</Text>
        </View>
    );
}