import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'
import products_reducer from '../reducers/products_reducer'

const initialState = {
  filtered_products:[],
  all_products:[],
  grid_view:false, // Burası grid view gösterimi için kullanılacak.
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {

const {products}=useProductsContext(); // Filtreleme yapabilmek için ürünlere sahip olmamız gerekiyor.Ana sayfada zaten fetch işlemi yapmıştık y
//tekerleği yeniden icat etmey gerek yok . Hem sistemde hız  hemde zaman tasarrufu için kullanabiliriz.
const [state,dispatch]=useReducer(reducer,initialState);


useEffect(()=>{
  //Dataları aldığımız yer burası.
  //Burada dataları bu yeni Hookumuzun içine aktarıyoruz
  dispatch({type:LOAD_PRODUCTS,payload:products})
},[products])

console.log(products)









  return (
    <FilterContext.Provider value={{...state}}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
