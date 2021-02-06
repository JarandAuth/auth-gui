const loginFactorTwo = async (credentials, basicToken) => {
    const response = await fetch("/api/login/factor-two", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${basicToken}`
        },
        body: JSON.stringify(credentials)
    });
    if (!response.ok) {
        return await response.json();
    }
    return {};
};

export {loginFactorTwo};
