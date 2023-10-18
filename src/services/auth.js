
export const loginAct = async function(payload) {
    try {
        const res = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(payload)
        });
        return res;
    } catch (error) {
        window.location.reload()
        // return error;
    }
};