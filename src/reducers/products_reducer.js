import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true }
    //Siderbar'ın aktif  olmasını sağladığımız fonksiyon burada amacımız  küçük ekrana gelince ona göre bir tasarıma sahip olmak.
    //Kullanıcı sağda bulunan butona basınca bu fonksiyon sayesinde menünün açılmasını sağlıyoruz.
  }
  if (action.type === SIDEBAR_CLOSE) {
    //Üstte bununun işemin tam tersi x butonununa basınca açılan menünün kapanmasını sağlıyoruz.
    
    return { ...state, isSidebarOpen: false }
  }
  if (action.type === GET_PRODUCTS_BEGIN) {
    //Ekanda bir loading işlemi gerçekleştirmek için kullanmak istediğimiz method. Eğer bilgilerin gelmesi uzun sürüyorsa bu fonksiyon sayesinde ekranda loading işlemi gösterebiliriz.
    return { ...state, products_loading: true }
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    //Gelen datalar eğer başarılı bir şekilde gelmiş ise 
    //Bunu ekrana yazdırmak için ürün compenentine bu dataları bildirmemiz return etmemiz gereken dataları yolladığımız fonksiyon.
    
    const featured_products = action.payload.filter(
      (product) => product.featured === true
    )
    return {
      ...state, //GElen bilgiler
      products_loading: false, //Folading olayı bitti datalar ulaşıldı bundan dolayı false
      products: action.payload, //Dataları yolluyoruz elimizde iki farklı data olduğu için bu şekilde bir işelm uyguluyoruz.
      featured_products,//Daha iyi anlamaak için dataları mutlaka inceleyin.
    }
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    //Eğer hata varsa ekrana bir hata  mesajı hata compenenti göstermek istersek 
    //Faydalanacağımız foknksiyon.
    return { ...state, products_loading: false, products_error: true }
  }


  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    //Üstte genel olarak uygulamalar için yaptığımız bütün uygulamaları burada tek bir ürüne göre yeniden düzenliyoruz.
    //Eğer çalışma başladı ise loading sekmesinin çalışması için gerekli olan state durumunun oluşturuyoruz.
    return {
      ...state,
      single_product_loading: true,//Yükleme yapılabilir. Bundan dolayı true
      single_product_error: false,//Tarama başladı herhangi bir hata yok bundan dolayı false
    }
  }


  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false, //Yükleme bitti false olması gerekir
      single_product: action.payload, //Yüklenen datanın return etmesini için gerekli olan fonksiyon.
    }
  }


  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_loading: false, //Burada yükleme işleminin false olması gerekiyor
      single_product_error: true,     // Eğer hata varsa bunu ekrana yazdırabilmemiz için olan kısım.
    }
  }


  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer
