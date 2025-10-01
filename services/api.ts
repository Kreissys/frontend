const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000/api";


export async function getProduct(slug = "guantes-hapticos") {
    const res = await fetch(`${API_URL}/products/${slug}/`);
    if (!res.ok) throw new Error("Error cargando producto");
    return res.json();
}
export async function getTeam() {
    const res = await fetch(`${API_URL}/team/`);
    return res.json();
}