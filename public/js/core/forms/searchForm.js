import { enableSearchButtons } from "../../ui/forms/formInputs.js";
import { buildPaginationHTML } from "../../ui/paginationUI.js";
import { renderArticles } from "../../ui/render/renderFeed.js";
import { searchValidators } from "../validations/validators.js";
import { useForm } from "../../application/shared/form.js";
import { searchNews } from "../../application/search/searchNews.js";
import { notifications } from "../../plugins/swal/swalComponent.js";

const inputs = ['textSearchOffcanvasInput', 'textSearchHeaderInput', 'textSearchFeedInput'];
const buttons = ['searchOffcanvasBtn', 'searchHeaderBtn', 'searchFeedBtn'];

enableSearchButtons(inputs, buttons);
useForm({
    selector: '#searchFeedForm',
    validators: searchValidators,
    sendRequest: async ({ formData }) => {

        const data = await searchNews(formData);
        const { articles, message } = data;

        renderArticles(articles, message);

        const titleElement = document.getElementById('searchTitle');
        titleElement.textContent = data.q;

        if (articles) {

            const paginationContainer = document.getElementById('paginationWrapper');
            paginationContainer.innerHTML = buildPaginationHTML(data.pagination);
        }

        if (data.messageType === 'success') notifications.showSuccess(message);
    }
});