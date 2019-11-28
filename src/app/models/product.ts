import { Subscription } from 'rxjs';

export interface Product {
    title: string;
    price: number;
    category: string;
    $key: string;
    imageUrl: string;
    subcription: Subscription
}