export const enableSearchButtons = (inputIds, buttonIds) => {
    
    inputIds.forEach((inputId, index) => {
        
        const inputElement = document.getElementById(inputId);
        const buttonElement = document.getElementById(buttonIds[index]);

        if (!inputElement || !buttonElement) return;

        inputElement.addEventListener('input', () => {
            buttonElement.disabled = inputElement.value.trim() === '';
        });
    });
}