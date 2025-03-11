'use server';

import {wait} from "@/share/libs/dev";
import {type Article, ArticleStatus} from "../model/article";
import {articles} from "../mock";
import {getPaginationData, paginate, PaginationResult} from "@/share/libs/pagination";
import {getNation} from "@/entities/nations";
import { auth } from "@/features/auth";
import {Role} from "@/entities/users";

export async function getArticleByNationId(id: string): Promise<Article | null> {
    await wait(1000);
    return articles.find(article => article.nationId.includes(id)) ?? null;
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
    if (index === -1) {
        throw new Error(`Статья с ID ${id} не найдена`);    
    }
    
    articles.splice(index, 1);
}

export async function getArticles(currentPage: number, pageSize: number, query: string): Promise<Article[]> {
    await wait(1000);
    let filteredArticles = [...articles];

    // Фильтрация по запросу (поиск в title и author)
    if (query) {
        query = query.toLowerCase();
        filteredArticles = filteredArticles.filter(article =>
            article.title.toLowerCase().includes(query) ||
            article.authorId.toLowerCase().includes(query)
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
        if (query.has('status')) {
            const statusQuery = query.get('status');
            if (statusQuery === null || article.status !== statusQuery) {
                return false;
            }
        }
        
        if (query.has('nationId')) {
            const nationIdQuery = query.get('nationId');
            if (nationIdQuery === null || !article.nationId.includes(nationIdQuery)) {
                return false;
            }
        }
        if (query.has('query') && !article.title.toLowerCase().includes(query.get('query')!.toLowerCase())) return false;
        return !(query.has('authorId') && !article.authorId.toLowerCase().includes(query.get('authorId')!.toLowerCase()));

    });

    return paginate(filteredArticles, currentPage, pageSize);
}

export async function getArticlesPaginationInfo(currentPage: number, pageSize: number, query: URLSearchParams = new URLSearchParams()): Promise<PaginationResult> {
    return getPaginationData(await findArticles(currentPage, pageSize, query), currentPage, pageSize);
}

// DO: Функции для получения данных хранятся в repository.ts - есть
// DO: Нации можно получить через Promise.all вызывая нации - не пон, пока оставлю так 
// DO: Если читал про FSD то на кросс импорт модулей забей - есть
export async function fetchNationsForArticles(articles: Article[]): Promise<Map<string, string>> {
    const nationIds = [...new Set(articles.flatMap(article => article.nationId))]; // Уникальные nationId
    const nations = await Promise.all(nationIds.map(id => getNation(id)));
    const nationMap = new Map<string, string>();
    nations.forEach(nation => {
        if (nation) nationMap.set(nation.id, nation.name); // Предполагаем, что nation имеет id и name
    });
    return nationMap;
}

export async function getUserArticles(): Promise<Article[]> {
    const session = await auth();
    if (!session?.user?.id) return [];
    // Здесь должна быть логика запроса к API или базе данных
    const mockArticles: Article[] = [
        {
            id: "1",
            nationId: ["1"],
            authorId: session.user.id,
            title: "Русские: История и Культура",
            content: [{ type: "paragraph", text: "Русские – восточнославянский народ..." }],
            status: ArticleStatus.PENDING,
            rejectionReason: undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        // ... другие статьи
    ];
    return mockArticles.filter(article => article.authorId === session.user.id);
}

export async function getPendingArticles(): Promise<Article[]> {
    const session = await auth();
    if (!session?.user?.role || session.user.role !== Role.MODERATOR) return [];
    // Здесь должна быть логика для модератора
    const mockArticles: Article[] = [
        {
            id: "2",
            nationId: ["1"],
            authorId: "user2",
            title: "Монголы: История",
            content: [{ type: "paragraph", text: "Монголы – кочевой народ..." }],
            status: ArticleStatus.PENDING,
            rejectionReason: undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];
    return mockArticles.filter(article => article.status === ArticleStatus.PENDING);
}

export async function updateArticleStatus(articleId: string, status: ArticleStatus, reason?: string): Promise<void> {
    // Здесь должна быть логика обновления статуса в API или базе данных
    console.log(`Обновлён статус статьи ${articleId} на ${status}, причина: ${reason}`);
}

