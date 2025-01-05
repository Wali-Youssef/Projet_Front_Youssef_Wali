export default async function (endpoint: string, {method, body}: {method: 'GET'|'POST'|'DELETE'|'PUT', body?: { [ key:string ]: string} }) {

    try {
        const _config = useRuntimeConfig()

        const response = await fetch(`${_config.public.apiTrackingBaseUrl}${endpoint}`, {
            method,
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`
            },
            ...body &&  {
                body: JSON.stringify(body)
            }
        })

        if (!response.ok) throw new Error('Une erreur est survenue')

        await response.json()

    } catch (err) {
        console.error('Error during API call:', err) // Gérer l'erreur
        return null
    }

    // return ...
}
