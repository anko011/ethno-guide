import {articleFormSchema} from "./article-form-schema";

export function validateArticleForm(formData?: FormData) {
    return articleFormSchema.safeParse({
            title: formData?.get('title'),
            content: formData?.get('content'),
            author: formData?.get('author'),
            nationId: formData?.get('nationId'),
        });
}