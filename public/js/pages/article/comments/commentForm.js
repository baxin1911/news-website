import { sendComment } from "../../../api/commentApi.js";
import { useForm } from "../../../application/form.js";
import { articleCommentValidators } from "../../../core/validations/validators.js";
import { appendComment } from "../../../ui/render/renderCommentList.js";

export const initCommentForm = (quill) => {

    useForm({
        selector: '#commentForm',
        validators: articleCommentValidators,
        normalizeData: (form, data) => data.message = quill.root.innerHTML,
        sendRequest: (data, options) => sendComment(data, options),
        onSuccess: {
            appendComment: (comment) => appendComment(comment, quill)
        }
    });
}