'use server';

import {wait} from "@/share/libs/dev";

import {type Article} from "../model/article";
import {articles} from "../mock";
import {getPaginationData, paginate, PaginationResult} from "@/share/libs/pagination";

export async function getArticleByNationId(id: string): Promise<Article | null> {
    await wait(1000);
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
        id: (Math.max(...articles.map(({id}) => parseInt(id)), 0) + 1).toString(),
    });
}

export async function editArticle(articleId: string, data: Omit<Article, 'id'>): Promise<void> {
    await wait(1000);
    const article = articles.find((article) => article.id === articleId);
    if (!article) throw new Error(`Article ${articleId} not found`);
    const index = articles.findIndex((article) => article.id === articleId);
    articles[index] = {...article, ...data};
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

export async function findArticles(
    currentPage: number,
    pageSize: number,
    query: URLSearchParams = new URLSearchParams()
): Promise<Article[]> {
    await wait(1000);

    const filteredArticles = articles.filter(article => {
        if (query.has('nationId') && article.nationId !== query.get('nationId')) return false;
        if (query.has('query') && !article.title.toLowerCase().includes(query.get('query')!.toLowerCase())) return false;
        return !(query.has('author') && !article.author.toLowerCase().includes(query.get('author')!.toLowerCase()));

    });

    return paginate(filteredArticles, currentPage, pageSize);
}

export async function getArticlesPaginationInfo(currentPage: number, pageSize: number, query: URLSearchParams = new URLSearchParams()): Promise<PaginationResult> {
    return getPaginationData(await findArticles(currentPage, pageSize, query), currentPage, pageSize);
}