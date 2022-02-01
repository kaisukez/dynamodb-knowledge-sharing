import { Article, User, Subscription } from './types'

export const articles: Article[] = [
    {
        article_id: 'a93cae22-7a9b-4b4f-b6b0-b40db54b4803',
        article_title: 'fake news',
        article_content: 'fake news fake news fake news fake news fake news fake news fake news fake news fake news fake news fake news fake news',
        article_category: 'CAT',
        article_upload_datetime: (new Date(2021, 1, 11, 0, 0, 0, 0)).toISOString(),
    },
    {
        article_id: '919fed0a-8a0d-4ccc-b9f3-5eb387f49579',
        article_title: 'real news',
        article_content: 'real news real news real news real news real news real news real news',
        article_category: 'DOG',
        article_upload_datetime: (new Date(2021, 2, 12, 0, 0, 0, 0)).toISOString(),
    },
    {
        article_id: 'fa48dc82-fedd-49ee-8a0d-194c375d2ed4',
        article_title: 'one two three',
        article_content: 'one two three one two three one two three one two three one two threeone two three one two three',
        article_category: 'FISH',
        article_upload_datetime: (new Date(2021, 3, 13, 0, 0, 0, 0)).toISOString(),
    },
    {
        article_id: '7d1f60bb-532c-4344-9902-d8a75e143f98',
        article_title: 'nine ten',
        article_content: 'nine ten nine ten nine ten nine ten nine ten',
        article_category: 'CAT',
        article_upload_datetime: (new Date(2021, 4, 14, 0, 0, 0, 0)).toISOString(),
    },
    {
        article_id: 'a10715d3-ace2-45cc-8031-85272e0d4be7',
        article_title: 'pizza',
        article_content: 'pizza pizza pizza pizza',
        article_category: 'DOG',
        article_upload_datetime: (new Date(2021, 5, 15, 0, 0, 0, 0)).toISOString(),
    },
    {
        article_id: '9d61e8d3-7ce1-4ed6-9087-9b6d01d2e4d0',
        article_title: 'delicious',
        article_content: 'delicious delicious delicious delicious delicious delicious delicious delicious',
        article_category: 'FISH',
        article_upload_datetime: (new Date(2021, 6, 16, 0, 0, 0, 0)).toISOString(),
    },
]

export const users: User[] = [
    {
        user_id: 'ea2dd93e-0568-47ef-8004-bc4990425f1a',
        user_username: 'fake_user',
        user_password: 'fake_user_password',
    },
    {
        user_id: 'b40baf3a-4a76-439a-be0e-5f3cd49a6b7d',
        user_username: 'real_user',
        user_password: 'real_user_password',
    },
    {
        user_id: '5b52cc97-e777-431f-98c6-4bb5666ef4cc',
        user_username: 'bird',
        user_password: 'bird_password',
    },
    {
        user_id: '480d9298-008e-4228-8e83-e92541235b08',
        user_username: 'elephant',
        user_password: 'elephant_password',
    },
]

export const subscriptions: Subscription[] = [
    {
        subscription_id: 'b48367aa-d040-4430-8279-1c17e2900af9',
        subscription_user_id: users[0].user_id,
        subscription_start_date: (new Date(2021, 7, 20, 0, 0, 0, 0)).toISOString(),
        subscription_end_date: (new Date(2021, 12, 20, 0, 0, 0, 0)).toISOString(),
        subscription_payment_status: 'paid',
    },
    {
        subscription_id: 'e51150a3-d9d4-4da2-8042-84336abcd15a',
        subscription_user_id: users[1].user_id,
        subscription_start_date: null,
        subscription_end_date: null,
        subscription_payment_status: 'not_pay_yet',
    },
]