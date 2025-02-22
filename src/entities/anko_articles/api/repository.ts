'use server'

import {type Article} from "../model/article";

export const getArticles = async (query: string = ''): Promise<Article[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockData = [
                {id: '1', title: 'Статья 1', description: 'Описание статьи 1', image: ''},
                {id: '2', title: 'Статья 2', description: 'Описание статьи 2', image: ''},
                {id: '3', title: 'Статья 3', description: 'Описание статьи 3', image: ''},
            ] satisfies Article[];
            resolve(mockData.filter((article) => article.title.toLowerCase().includes(query.toLowerCase())));
        }, 5000);
    });
};
