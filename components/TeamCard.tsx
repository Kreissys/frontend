import { View, Text, Image } from "react-native";
import { colors } from "../theme/palette";
export default function TeamCard({ name, role, bio, photo }:{ name:string; role:string; bio:string; photo?:string }){
    return (
        <View style={{ width: 280, backgroundColor: colors.surface, padding: 16, borderRadius: 14, borderWidth:1, borderColor: colors.border }}>
            {!!photo && <Image accessibilityLabel={`${name} – ${role}`} source={{ uri: photo }} style={{ width: "100%", height: 160, borderRadius: 12, marginBottom: 12 }} />}
            <Text style={{ color: colors.text, fontWeight: "800" }}>{name}</Text>
            <Text style={{ color: colors.muted, marginBottom: 8 }}>{role}</Text>
            <Text style={{ color: colors.text }}>{bio}</Text>
        </View>
    );
}