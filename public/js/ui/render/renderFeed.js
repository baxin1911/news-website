import { formatShortDate, getCategory, slugify } from "../../utils/formatters.js";

export const renderArticles = (articles, message) => {
    const container = document.getElementById('searchResults');
            
    if (articles.length < 1) {
        
        container.innerHTML = `
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="alert alert-info text-center my-4">
                        ${message || 'No se encontraron artículos.'}
                    </div>
                </div>
            </div>
        `;
        
        return;
    }

    container.innerHTML = articles.map(article => {
        const category = article.category ? getCategory(article.category) : '';
        const imageUrl = article.coverPath ?? (article.blocks.find(block => block.type === 'image')?.content || '');
        const shortDescription = article.description.length > 100 ? `${article.description.substring(0, 100)} ...` : article.description;
        const shortTitle = article.title.length > 50 ? `${article.title.substring(0, 50)} ...` : article.title;
        const date = article.publicationDate ? formatShortDate(article.publicationDate) : '';

        return `
            <li class="mb-3">
                <article class="card">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${imageUrl}" class="img-fluid rounded-start" alt="Imagen de la noticia">
                        </div>

                        <div class="col-md-8">
                            <div class="card-body">
                                <h3 class="card-title">
                                    <a class="me-3" href="/${slugify(article.title)}">${shortTitle}</a>
                                    ${category ? `<a href="/categories/${category}" class="badge bg-primary">${category}</a>` : ''}
                                </h3>

                                ${shortDescription ? `<p class="card-text">${shortDescription}</p>` : ''}

                                ${date ? `<p class="card-text"><small class="text-muted">${date}</small></p>` : ''}
                            </div>
                        </div>
                    </div>
                </article>
            </li>
        `;
    }).join('');
}