import { searchNews } from "../../api/searchApi";
import { useForm } from "./form";

const inputs = ['textSearchOffcanvasInput', 'textSearchHeaderInput'];
const buttons = ['searchOffcanvasBtn', 'searchHeaderBtn'];

inputs.forEach((inputId, index) => {
    const inputElement = document.getElementById(inputId);
    const buttonElement = document.getElementById(buttons[index]);

    inputElement.addEventListener('input', () => {
        buttonElement.disabled = inputElement.value.trim() === '';
    });
});

useForm({
    selector: '#searchFeedForm',
    sendRequest: (data, options) => searchNews(data, options)
});