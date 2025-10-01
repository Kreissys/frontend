import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import Section from "../components/Section";
import { colors } from "../theme/palette";
import KPI from "../components/KPI";
import ProgressBar from "../components/ProgressBar";
import { connectStats } from "../services/ws";


type Stats = { total_players:number; active_players:number; finished_players:number; top10:{nickname:string;progress:number}[] };


export default function Live(){
    const [stats, setStats] = useState<Stats>({ total_players:0, active_players:0, finished_players:0, top10:[] });


    useEffect(()=>{
        const ws = connectStats((data)=> setStats(data));
        return ()=> ws.close();
    },[]);


    return (
        <Section title="En vivo" subtitle="Actividad de jugadores en tiempo real">
            <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
                <KPI label="Jugadores totales" value={stats.total_players} />
                <KPI label="Activos" value={stats.active_players} />
                <KPI label="Completaron" value={stats.finished_players} />
            </View>


            <Text style={{ color: colors.text, fontWeight: "800", fontSize: 18, marginBottom: 12 }}>Top 10 progreso</Text>
            <FlatList
                data={stats.top10}
                keyExtractor={(it)=> it.nickname}
                renderItem={({item})=> (
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ color: colors.text, marginBottom: 6 }}>{item.nickname} – {item.progress}%</Text>
                        <ProgressBar value={item.progress} />
                    </View>
                )}
            />
        </Section>
    );
}