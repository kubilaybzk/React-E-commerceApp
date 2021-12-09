import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";
import products_reducer from "../reducers/products_reducer";

const initialState = {
  filtered_products: [], // Tüm elemanların düzenlenip sıralama yapıldığı yer.
  all_products: [], //Tüm ürünlerin listelendiği değer.
  grid_view: true, // Burası grid view gösterimi için kullanılacakürünlerin alt alta açıklamalı yada normal olmasını sağlamak için düzenlenen bir sistem.
  sort: "price-lowest", //Default olarak price-lowest değerini burada atıyoruz.
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext(); // Filtreleme yapabilmek için ürünlere sahip olmamız gerekiyor.Ana sayfada zaten fetch işlemi yapmıştık y
  //tekerleği yeniden icat etmey gerek yok . Hem sistemde hız  hemde zaman tasarrufu için kullanabiliriz.
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    //Dataları aldığımız yer burası.
    //Burada dataları bu yeni Hookumuzun içine aktarıyoruz
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (e) => {
    /* Kullanıcıdan gelen bilgilere göre sıralama yapılan yer.
  Burada e.targer.name ise sort isimli form'dan bu bilginin geldiğini biliyoruz.
  Burada dispatch ederek gerekli sıralama işlemi yapılması sağlanıyor. */
    //const userwant=e.target.name
    const userwant_value = e.target.value;
    //console.log(userwant,userwant_value)
    dispatch({ type: UPDATE_SORT, payload: userwant_value });
  };

  const updateFilters = (e) => {
    //Burada Product sayfasında bulunan ürünlere text ile arama yaparken kullanılan
    //state işlemini yapıyoruz.
    //initialState içinde bulunan TEXT değişkeni defauld olarak '' ayarlanmış.
    //Burada amacımız bu değişkeni buna göre düzenemek.
    let name = e.target.name
    let value = e.target.value
        //console.log(name,value)
        if (name === 'category') {
          value = e.target.textContent
        }
        if (name === 'color') {
          value = e.target.dataset.color
        }
        if (name === 'price') {
          value = Number(value)
        }
        if (name === 'shipping') {
          value = e.target.checked
        }
        dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
