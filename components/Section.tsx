import { View, Text } from "react-native";
import { colors } from "../theme/palette";
export default function Section({ title, subtitle, children }:{ title:string; subtitle?:string; children:any }){
    return (
        <View style={{ paddingVertical: 48, borderBottomWidth: 1, borderColor: colors.border }}>
            <View style={{ maxWidth: 1200, alignSelf: "center", paddingHorizontal: 16 }}>
                <Text style={{ color: colors.text, fontSize: 28, fontWeight: "800", marginBottom: 8 }}>{title}</Text>
                {subtitle ? <Text style={{ color: colors.muted, marginBottom: 24 }}>{subtitle}</Text> : null}
                {children}
            </View>
        </View>
    );
}