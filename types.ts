export type Key = string

export interface Article {
    article_id: Key
    article_title: string
    article_content: Key
    article_category: string
    article_is_premium: string
    article_upload_datetime: string
    article_user_id: string
}

export interface User {
    user_id: Key
    user_username: string
    user_password: string
}

export interface Subscription {
    subscription_id: Key
    subscription_user_id: string
    subscription_start_date: string | null
    subscription_end_date: string | null
    subscription_payment_status: string
}

export interface DateRange {
    start: string
    end: string
}