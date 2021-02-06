const getAppName = async (clientId) => {
    const response = await fetch(`/api/app/${clientId}`, {
        method: "GET",
        credentials: "same-origin"
    });
    if (!response.ok) {
        return;
    }
    return await response.json();
};

export {getAppName};
