export async function getStuff() {
    const res  = await fetch('/api/stuff')
    const data = await res.json()
    return { data }
}
