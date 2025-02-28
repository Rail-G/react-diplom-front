import { createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { CartFinallyOrder } from '../../components/Main/Pages/CardItemPage/CardItemTools/CardItemTools'

const cartItemTransform = createTransform<CartState, {cartItems: CartFinallyOrder[]}>(
    (inbound) => ({
        cartItems: inbound.cartItems
    }),
    (onbound) => ({
        cartItems: onbound.cartItems,
        orderQuantity: onbound.cartItems.length
    })
)

export const persistConfig = {
    key: 'cartItem',
    storage,
    whitelist: ['order'],
    transforms: [cartItemTransform]
}