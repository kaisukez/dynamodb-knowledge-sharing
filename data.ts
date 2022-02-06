import { Article, User, Subscription } from './types'

export const articles: Article[] = [
    {
        article_id: 'a93cae22-7a9b-4b4f-b6b0-b40db54b4803',
        article_title: 'fake news',
        article_content: 'fake news fake news fake news fake news fake news fake news fake news fake news fake news fake news fake news fake news',
        article_category: 'CAT',
        article_is_premium: 'TRUE',
        article_upload_datetime: '2021-02-10T17:00:00.000Z',
    },
    {
        article_id: '84a4409a-794c-47c4-9a56-0161c864a94e',
        article_title: 'haha',
        article_content: 'haha haha haha haha haha haha haha haha haha haha haah haha',
        article_category: 'CAT',
        article_is_premium: 'TRUE',
        article_upload_datetime: '2021-02-21T17:00:00.000Z',
    },
    {
        article_id: '919fed0a-8a0d-4ccc-b9f3-5eb387f49579',
        article_title: 'real news',
        article_content: 'real news real news real news real news real news real news real news',
        article_category: 'DOG',
        article_is_premium: 'FALSE',
        article_upload_datetime: '2021-03-11T17:00:00.000Z',
    },
    {
        article_id: '6eb7f2b4-5c4a-4e1d-a0ce-23cba6b7dd78',
        article_title: 'eiei',
        article_content: 'eiei eiei eiei eiei eiei eiei eiei eiei eiei eiei eiei eiei eiei eiei eiei',
        article_category: 'DOG',
        article_is_premium: 'FALSE',
        article_upload_datetime: '2021-03-22T17:00:00.000Z',
    },
    {
        article_id: 'fa48dc82-fedd-49ee-8a0d-194c375d2ed4',
        article_title: 'one two three',
        article_content: 'one two three one two three one two three one two three one two threeone two three one two three',
        article_category: 'FISH',
        article_is_premium: 'TRUE',
        article_upload_datetime: '2021-04-12T17:00:00.000Z',
    },
    {
        article_id: '212a8d05-39d3-4da5-b95d-04adae4de921',
        article_title: 'four five six',
        article_content: 'four five six four five six four five six four five six four five six four five six',
        article_category: 'FISH',
        article_is_premium: 'TRUE',
        article_upload_datetime: '2021-04-23T17:00:00.000Z',
    },
    {
        article_id: '075ceefb-2ddc-40c3-8c9d-d877f865d678',
        article_title: 'seven eight',
        article_content: 'seven eight seven eight',
        article_category: 'CAT',
        article_is_premium: 'FALSE',
        article_upload_datetime: '2021-05-13T17:00:00.000Z',
    },
    {
        article_id: '7d1f60bb-532c-4344-9902-d8a75e143f98',
        article_title: 'nine ten',
        article_content: 'nine ten nine ten nine ten nine ten nine ten',
        article_category: 'CAT',
        article_is_premium: 'FALSE',
        article_upload_datetime: '2021-05-24T17:00:00.000Z',
    },
    {
        article_id: 'a10715d3-ace2-45cc-8031-85272e0d4be7',
        article_title: 'pizza',
        article_content: 'pizza pizza pizza pizza',
        article_category: 'DOG',
        article_is_premium: 'TRUE',
        article_upload_datetime: '2021-06-14T17:00:00.000Z',
    },
    {
        article_id: '3c65d54c-d741-46db-9040-6dbd1a9bb02a7',
        article_title: 'hamburger',
        article_content: 'hamburger hamburger hamburger hamburger hamburger hamburger',
        article_category: 'DOG',
        article_is_premium: 'TRUE',
        article_upload_datetime: '2021-06-25T17:00:00.000Z',
    },
    {
        article_id: '9d61e8d3-7ce1-4ed6-9087-9b6d01d2e4d0',
        article_title: 'delicious',
        article_content: 'delicious delicious delicious delicious delicious delicious delicious delicious',
        article_category: 'FISH',
        article_is_premium: 'FALSE',
        article_upload_datetime: '2021-07-15T17:00:00.000Z',
    },
    {
        article_id: '977d282e-bd9d-431e-ac1d-42bb4c7efb68',
        article_title: 'tasty',
        article_content: 'tasty tasty tasty tasty tasty tasty tasty',
        article_category: 'FISH',
        article_is_premium: 'FALSE',
        article_upload_datetime: '2021-07-26T17:00:00.000Z',
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
        subscription_start_date: '2021-08-19T17:00:00.000Z',
        subscription_end_date: '2022-01-19T17:00:00.000Z',
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