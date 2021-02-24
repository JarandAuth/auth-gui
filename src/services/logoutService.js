const logout = async () => {
    const response = await fetch(`/api/logout`, {
        method: "POST"
    });
    return response.ok;
};

export {logout};
