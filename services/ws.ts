export function connectStats(onMessage: (data: any) => void) {
    const WS_URL = (process.env.EXPO_PUBLIC_WS_URL || "ws://localhost:8000") + "/ws/stats/";
    const ws = new WebSocket(WS_URL);
    ws.onmessage = (evt) => {
        try { onMessage(JSON.parse(evt.data)); } catch {}
    };
    return ws;
}   