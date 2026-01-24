import { existsArticleByTitle } from "../../services/articleService.js";
import { existsTagByName } from "../../services/tagService.js";
import { unslugify } from "../../utils/formattersUtils.js";
import { showArticleWithPagination } from "./articleController.js";
import { showTagFeedWithPagination } from "./feedController.js";

export const resolveSlug = async (req, res, next) => {

    const { slug } = req.params;

    const text = unslugify(slug);
    const existsTitle = await existsArticleByTitle(text);

    if (existsTitle) return showArticleWithPagination[0](
        req, res, () => showArticleWithPagination[1](req, res, next)
    );

    const existsTag = await existsTagByName(text);

    if (existsTag) return showTagFeedWithPagination[0](
        req, res, () => showTagFeedWithPagination[1](req, res, next)
    );

    return res.status(404).render('pages/error/404');
}