import { View } from "react-native";
import { colors } from "../theme/palette";
export default function ProgressBar({ value }:{ value:number }){
    return (
        <View style={{ height: 10, backgroundColor: "#2a2a3b", borderRadius: 10, overflow: "hidden" }}>
            <View style={{ width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: colors.accent, height: "100%" }} />
        </View>
    );
}