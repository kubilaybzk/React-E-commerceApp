import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  //Ürün eklemek için.
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload; // Bize gönderilen bilgileri alıyoruz.
    const tempItem = state.cart.find((i) => i.id === id + color); //Gelen bilgilerden ürünü buluyoruz
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        //ÜRÜN DAHA ÖNCE EKLENMİŞ VE KULLANICI AYNI ÜRÜNÜ İKİNCİ DEFA EKLİYOR İSE.
        //SEPETTE BU ÜRÜNDEN 2 TANE GÖZÜKMESİNİ İSTEMEYİZ BUNUN İÇİN
        //BURADA AMACIMIZ ÜRÜN DAHA ÖNCE EKLENMİŞ VE TEKRAR EKLENİYOR İSE STOK MİKTARINI DEĞİŞTİRMEK
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }

          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });

      return { ...state, cart: tempCart };
    } else {
      //Eğer ürün daha önce eklenmemiş ise otomatik olarak yeni bir eleman gibi davranmasını istiyoruz.
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  //Ürün silmek için

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }

  //Sepeti boşaltmak için
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  //Sepette ürün miktarını arttırma/azaltma
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      }
      return item;
    });

    return { ...state, cart: tempCart };
  }

  //Toplam maliyeti hesaplama
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;

        total.total_items += amount;
        total.total_amount += price * amount;
        return total;
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    );
    return { ...state, total_items, total_amount };
  }

  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
