const transitions = {};
async function fetchTransitions(accessToken) {
    const response = await fetch("https://api.motion.dev/me/transitions", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    if (response.ok) {
        const data = await response.json();
        if (data.transitions) {
            for (let i = 0; i < data.transitions.length; i++) {
                const { name, transition } = data.transitions[i];
                transitions[name || "Untitled Transition " + (i + 1)] =
                    transition;
            }
        }
    }
}
function getUserTransitions() {
    if (Object.keys(transitions).length === 0) {
        return [];
    }
    return [
        {
            type: "text",
            text: `User defined transitions - consider these when implementing new animations: ` +
                JSON.stringify(transitions),
        },
    ];
}

export { fetchTransitions, getUserTransitions, transitions };
