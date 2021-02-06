const getConnectedApps = async () => {
    const response = await fetch(`/api/connected-app`, {
        method: "GET",
        credentials: "same-origin"
    });
    if (!response.ok) {
        return;
    }
    return await response.json();
};

export {getConnectedApps};
