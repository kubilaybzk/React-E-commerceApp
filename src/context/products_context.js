import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
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
import products_reducer from '../reducers/products_reducer'

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  //Burada bilgileri çekiyoruz amacımız dataların gelip gelmediğini kontrol eden küçük bilgilere sahip olmak kullanıcıya buna göre cıktılar vereceğiz.
  //Eğer bilgiler alınmaya başlandı ise GET_PRODUCTS_BEGİN fonksiyonu çalışacak bu bize bilgilerin alındığını gösteren bir işlem.
  //Burada amacımız ;
  /*
1- gelen bilgileri fetch et.
Eğer bilgiler geldi ise .Başarılı olduğunu bildiriyoruz . Bildirdiğimiz fonskiyon içinde ürünleri yolluyoruz.

Gelen bilgiler yanlış ise dataların gelmediğini bildiren bir hata mesajı yollamak zorundayız bundan dolayı burada GET_PRODUCTS_ERROR fonksiyonunu çalıştıyoruz.
  */

  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN }) // işleme başlandığını belirtiyoruz.
    try {
      const response = await axios.get(url)
      const products = response.data //Verileri alıyoruz.
      //console.log(products)
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })//Bİlgiler başarılı bir şekilde ulaşıldı.
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR }) // Gelen bilgilerde hata var
    }
  }

  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const response = await axios.get(url)
      const singleProduct = response.data
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  useEffect(() => {
    fetchProducts(url)
  }, [])

  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
