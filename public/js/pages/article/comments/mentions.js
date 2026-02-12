import { searchUsers } from "../../../api/userApi.js";
import { initFormCommentTribute } from "../../../plugins/tribute/articleTribute.js";

export const initMentions = (quill) => {
    
    initFormCommentTribute({
        element: quill.root, 
        selectTemplate: (item, tribute) => {

            if (!item || !item.original) return '';

            const range = quill.getSelection(true);

            if (!range) return '';

            const mentionText = tribute.current.mentionText;
            const startPos = range.index - mentionText.length - 1;

            if (startPos < 0) return '';

            quill.insertEmbed(range.index, 'mention', {
                id: item.original.id,
                username: item.original.username
            }, 'silent');
            quill.deleteText(startPos, mentionText.length + 1, 'silent');
            quill.insertText(startPos + 1, ' ', 'silent');
            quill.setSelection(range.index + 2, 0, 'silent');

            return '';
        },
        searchFn: async (q) => new Promise(async (resolve) => 

            await searchUsers({ q }, {
                context: 'mention',
                onSuccess: {
                    showMentionedUser: (users) => resolve(users)
                },
                onError: {
                    showUndefinedUser: () => resolve([])
                }
            })
        )
    });
}