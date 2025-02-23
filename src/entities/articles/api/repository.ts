'use server';

import { type Article } from "../model/article";
import { articles } from "../mock";
import { wait } from "@/share/libs/dev";

export async function getArticleByNationId(id: string): Promise<Article | null> {
    return articles.find(article => article.nationId === id) ?? null;
}

export async function getArticle(id: string): Promise<Article> {
    await wait(1000);
    const article = articles.find((article) => article.id === id);
    if (!article) throw Error(`Article: ${id} not found`);
    return article;
}

export async function getAllArticles(): Promise<Article[]> {
    await wait(1000);
    return [...articles];
}

export async function createArticle(data: Omit<Article, 'id'>): Promise<void> {
    await wait(1000);
    articles.push({
        ...data,
        id: (Math.max(...articles.map(({ id }) => parseInt(id)), 0) + 1).toString(),
    });
}

export async function editArticle(articleId: string, data: Omit<Article, 'id'>): Promise<void> {
    await wait(1000);
    const article = articles.find((article) => article.id === articleId);
    if (!article) throw new Error(`Article ${articleId} not found`);
    const index = articles.findIndex((article) => article.id === articleId);
    articles[index] = { ...article, ...data };
}

export async function deleteArticle(id: string): Promise<void> {
    const index = articles.findIndex((article) => article.id === id);
    if (index !== -1) {
        articles.splice(index, 1);
    }
}

export async function getArticles(currentPage: number, pageSize: number, query: string): Promise<Article[]> {
    await wait(1000);
    let filteredArticles = [...articles];

    // Фильтрация по запросу (поиск в title и author)
    if (query) {
        query = query.toLowerCase();
        filteredArticles = filteredArticles.filter(article =>
            article.title.toLowerCase().includes(query) ||
            article.author.toLowerCase().includes(query)
        );
    }

    // Пагинация
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredArticles.slice(startIndex, endIndex);
}

export async function getArticlesPaginationInfo(currentPage: number, pageSize: number, query: string): Promise<{
    items: Article[];
    totalPages: number;
    totalItems: number;
}> {
    await wait(1000);
    let filteredArticles = [...articles];

    // Фильтрация по запросу
    if (query) {
        query = query.toLowerCase();
        filteredArticles = filteredArticles.filter(article =>
            article.title.toLowerCase().includes(query) ||
            article.author.toLowerCase().includes(query)
        );
    }

    const totalItems = filteredArticles.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    // Пагинация
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const items = filteredArticles.slice(startIndex, endIndex);

    return { items, totalPages, totalItems };
}