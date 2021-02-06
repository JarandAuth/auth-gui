const registerTotp = async (credentials, registeredToken) => {
    const response = await fetch("/api/register/totp-setup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${registeredToken}`
        },
        body: JSON.stringify(credentials)
    });
    if (!response.ok) {
        return await response.json();
    }
    return {};
};

export {registerTotp};
