import { useForm } from "../../core/form.js";
import { searchNews } from "../../api/helpers/search.js";
import { toggleErrorMessages } from "../../utils/utils.js";
import { validateDateRange, validateEndDate, validateSelectedOrdering, validateStartDate } from "../../utils/validations/search.js";

useForm({
    idForm: 'searchMenuForm',
    method: 'get',
    endpoint: '/search',
    validate: (data) => {

        const errors = {};

        if (!data.errors) {

            errors.startDateSearchInputError = validateStartDate(data.startDate);
            errors.endDateSearchInputError = validateEndDate(data.endDate);
            errors.endDateSearchInputError = validateDateRange(data.startDate, data.endDate);
            errors.selectOrderingSearchInputError = validateSelectedOrdering(data.ordering);

        } else {

            errors.startDateSearchInputError = data.errors.startDateError;
            errors.endDateSearchInputError = data.errors.endDateError;
            errors.endDateSearchInputError = data.errors.dateRangeError;
            errors.selectOrderingSearchInputError = data.errors.orderingError;
        }

        return errors;
    },
    sendRequest: (data) => searchNews(data),
    applyAfterSuccess: ({ response, data }) => {

        const params = new URLSearchParams(data);
        const state = {
            query: params.toString(),
            data: response.data,
            timestamp: Date.now()
        };

        renderResults(response.data);

        history.pushState(state, '', `/search?${ params.toString() }`);

        window.addEventListener('popstate', async (event) => {

            if (!event.state) {

                clearResults();
                return;
            }
            
            const { query, data, timestamp } = event.state;
            const age = Date.now() - timestamp;
            const MAX_AGE = 1000 * 60 * 5; // 5 minutes

            if (age < MAX_AGE) {
                renderResults(data);
            } else {
                const response = await searchNews(state.query);
                const freshData = response.data;
                renderResults(freshData);

                history.replaceState({query, data: freshData, timestamp: Date.now()}, '', `/search?${query}`);
            }
        });

    }
});

const renderResults = (data) => {
   
   const resultsContainer = document.getElementById('searchResults');
   resultsContainer.innerHTML = '';

   if (data && data.length > 0) {

    const list = document.createElement('ul');

       data.forEach(item => {
           const articleElement = document.createElement('div');
           articleElement.classList.add('list-item');
           articleElement.innerHTML = `
               <h3>${item.title}</h3>
               <p>${item.description}</p>
           `;
           resultsContainer.appendChild(articleElement);
       });

   } else {

       clearResults();
   }
};

const clearResults = () => {
   const resultsContainer = document.getElementById('searchResults');
   resultsContainer.innerHTML = '<p>No results found.</p>';
};
