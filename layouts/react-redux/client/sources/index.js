export async function getStuff() {
    const data = await fetch('/api/stuff')
    return {
        data: data.property
    }
}
