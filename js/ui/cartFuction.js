 export function getCartProducts (){
    const cartItems = localStorage.getItem("product");

    if (cartItems === null){
        return [];
    } else {
        return JSON.parse(cartItems);
    }

}