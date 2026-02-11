import { searchNews } from "../../api/searchApi.js";
import { enableSearchButtons } from "../../ui/forms/formInputs.js";
import { buildPaginationHTML } from "../../ui/paginationUI.js";
import { renderArticles } from "../../ui/render/renderFeed.js";
import { searchValidators } from "../validations/validators.js";
import { useForm } from "./form.js";

const inputs = ['textSearchOffcanvasInput', 'textSearchHeaderInput', 'textSearchFeedInput'];
const buttons = ['searchOffcanvasBtn', 'searchHeaderBtn', 'searchFeedBtn'];

enableSearchButtons(inputs, buttons);
useForm({
    selector: '#searchFeedForm',
    validators: searchValidators,
    sendRequest: (data, options) => searchNews(data, options),
    onSuccess: {
        updateNews: ({ articles, q, message, pagination }) => {

            renderArticles(articles, message);

            const titleElement = document.getElementById('searchTitle');
            titleElement.textContent = q;

            if (articles.length > 0) {

                const paginationContainer = document.getElementById('paginationWrapper');
                paginationContainer.innerHTML = buildPaginationHTML(pagination);
            }
        }
    }
});