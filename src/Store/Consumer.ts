import { create } from 'zustand';

import { RUBLE_SYMBOL } from '@/Consts';
import { CartItem, Parameter, Price, Product } from '@/Models/Catalog';

type Consumer = {
    cart: CartItem[];

    addCartItem: (params: { product: Product; quantity: number; parameter?: Parameter }) => void;
    removeCartItem: (params: { productId: string; parameterId?: string }) => void;
    changeQuantity: (params: { productId: string; quantity: number; parameterId?: string }) => void;
    getTotal: () => Price;
    clearCart: () => void;
};

export const useConsumerStore = create<Consumer>((set, get) => ({
    cart: [],

    addCartItem: ({ product, quantity, parameter }) => {
        set((state) => {
            const existingIndex = state.cart.findIndex(
                (item) => item.product.id === product.id && (parameter?.id || null) === (item.parameter?.id || null),
            );

            if (existingIndex !== -1) {
                const cart = [...state.cart];

                cart[existingIndex].quantity = quantity;

                return { cart };
            }

            return {
                cart: [...state.cart, { product, parameter, quantity }],
            };
        });
    },

    removeCartItem: ({ productId, parameterId }) => {
        set((state) => ({
            cart: state.cart.filter(
                (item) => item.product.id !== productId || (item.parameter?.id || null) !== (parameterId || null),
            ),
        }));
    },

    changeQuantity: ({ productId, parameterId, quantity }) => {
        if (quantity <= 0) {
            get().removeCartItem({ productId, parameterId });
            return;
        }

        set((state) => {
            const cart = state.cart.map((item) => {
                if (item.product.id === productId && (item.parameter?.id || null) === (parameterId || null)) {
                    return { ...item, quantity };
                }
                return item;
            });

            return { cart };
        });
    },

    getTotal: () => {
        const items = get().cart;
        let total = 0;
        const currency = items[0]?.product.price?.currency || RUBLE_SYMBOL;

        for (const item of items) {
            const basePrice = item.parameter?.price?.amount ?? item.product.price?.amount ?? 0;
            total += basePrice * item.quantity;
        }

        return { amount: total, currency };
    },

    clearCart: () => set({ cart: [] }),
}));
