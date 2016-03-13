export async function getStuff() {
    const res = await fetch('/api/stuff')
    return {
        data: res.json()
    }
}
