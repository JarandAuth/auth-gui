const loginFactorOne = async credentials => {
    const response = await fetch("/api/login/factor-one", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials)
    });
    return await response.json();
};

export {loginFactorOne};
