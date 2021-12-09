import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);//Burada gelen ürünler arasında max fiyatı buluyoruz.
    /*Bunu yapmamızdaki amaç 
        öncelikle ürünleri sıralarken  bütün ürünleri göstermek için 
        default değeri 0 olan "price:0" değerini max değer yapıyoruz.
        daha sonra maksimum artacak ücret barını ayarlamak için bu değeri 
        max_price:0 değerine atıyoruz.  
    */
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  //Product List sayfasında  grid_view değerine göre listeleme şekli düzenleniyor.
  /* Bunu aşağıda bulunan iki fonksiyon sağlıyor 

  */
  if (action.type === SET_LISTVIEW) {
    //Eğer kullanıcı listele butonuna basarsa bu fonskiyon çalışacak.
    //Product List sayfasında  grid_view değerine göre listeleme şekli düzenleniyor.
    return {
      ...state,
      grid_view: false,
    };
  }

  if (action.type === SET_GRIDVIEW) {
    //Eğer kullanıcı grid olarak göster butonuna basarsa bu fonksiyon çalışcak.
    return {
      ...state,
      grid_view: true,
    };
  }

  if (action.type === UPDATE_SORT) {
    //console.log("değer")
    //console.log(action.payload)
    /*Burada kullanıcının seçtiği değeri alıyoruz.
const updateSort=(e)=>{} fonksiyonundan gelen değeri burada atıyoruz
sort hookuna aktarıyoruz.
    */
    return {
      ...state,
      sort: action.payload,
    };
  }

  if (action.type === SORT_PRODUCTS) {
    /*Burda   if(action.type==='UPDATE_SORT'){} kısmında sort değişkenine atanan değere göre 
    Listede bulunan elemanlara
          sıralama yapılmasını sağlıyoruz.

    */

    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      });
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered_products: tempProducts };
  }


  /* Ürünler sayfasında bulunan solda bulunan filtreleme işlemleri Başlangıç */

if(action.type===UPDATE_FILTERS){
  const{name,value}=action.payload
  return {...state,filters:{...state.filters,[name]:value}}
}

if(action.type===FILTER_PRODUCTS){
  console.log('FILTER_PRODUCTS work')
  return{...state}
}

  /* Ürünler sayfasında bulunan solda bulunan filtreleme işlemleri Bitiş */








  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
