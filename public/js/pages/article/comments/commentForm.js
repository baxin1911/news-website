import { createComment } from "../../../application/comments/createComment.js";
import { useForm } from "../../../application/shared/form.js";
import { articleCommentValidators } from "../../../core/validations/validators.js";
import { notifications } from "../../../plugins/swal/swalComponent.js";
import { appendComment } from "../../../ui/render/renderCommentList.js";

export const initCommentForm = (quill) => {

    useForm({
        selector: '#commentForm',
        validators: articleCommentValidators,
        normalizeData: ({ formData }) => formData.message = quill.root.innerHTML,
        sendRequest: async ({ form, formData }) => {
            
            const data = await createComment(formData);

            notifications.showSuccess(data.message);
            form.reset();
            appendComment(data.comment, quill);
        }
    });
}