import {articleFormSchema} from "./article-form-schema";

export function validateArticleForm(formData?: FormData) {
    return articleFormSchema.safeParse({
            title: formData?.get('title'),
            content: formData?.get('content'),
            authorId: formData?.get('authorId'),
            nationId: (formData?.getAll('nationId') as string[]) || [],
        });
}