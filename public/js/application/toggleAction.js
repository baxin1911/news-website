import { setButtonError, setLoadingState } from "../ui/buttonUI.js";

export const handlerToggleAction = async (btn, handler, onSuccess) => {

    if (btn.dataset.loading) return;

    const { action, id, type } = btn.dataset;

    const data = { action, id, type };

    setLoadingState(btn, true);

    try {

        await handler(data, {
            context: 'action',
            onSuccess,
            onError: {
                showButtonError: () => setButtonError(btn)
            }
        });

    } finally {

        setLoadingState(btn, false);
        btn.blur();
    }
};