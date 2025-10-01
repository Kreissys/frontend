import { View } from "react-native";
import Section from "../components/Section";
import TeamCard from "../components/TeamCard";
import { useEffect, useState } from "react";
import { getTeam } from "../services/api";


export default function Creators(){
    const [team, setTeam] = useState<any[]>([]);
    useEffect(()=>{ getTeam().then(setTeam); },[]);
    return (
        <Section title="Creadores" subtitle="Conoce al equipo detrás del proyecto">
            <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap" }}>
                {team.map(m => (
                    <TeamCard key={m.id} name={m.name} role={m.role} bio={m.bio} photo={m.photo} />
                ))}
            </View>
        </Section>
    );
}