import { existsArticleByTitle } from "../../services/articleService.js";
import { existsTagByName } from "../../services/tagService.js";
import { unslugify } from "../../utils/formattersUtils.js";
import { showArticle } from "./articleController.js";
import { showTagFeed } from "./feedController.js";

export const resolveSlug = async (req, res) => {

    const { slug } = req.params;

    const text = unslugify(slug);
    const existsTitle = await existsArticleByTitle(text);

    if (existsTitle) return showArticle(req, res);

    const existsTag = await existsTagByName(text);

    if (existsTag) return showTagFeed(req, res);

    return res.status(404).render('error/404');
}