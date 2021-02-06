const checkTokenData = async () => {
    const response = await fetch(`/api/token-data`, {
        method: "GET",
        credentials: "same-origin"
    });
    if (!response.ok) {
        return {};
    }
    return await response.json();
};

export {checkTokenData};
