export const API = {
    baseUrl: 'http://localhost:8000',

    logIn(name: string, password: string) {
        const signInRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nickname: name,
                password: password,
            }),
        };

        return fetch(`${this.baseUrl}/auth/sign_in`, signInRequest)
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error during login:', error);
            });
    },
};
