import React from 'react'
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi'
export const links = [
  {
    id: 1,
    text: 'AnaSayfa',
    url: '/',
  },
  {
    id: 2,
    text: 'Hakkımızda',
    url: '/about',
  },
  {
    id: 3,
    text: 'Ürünler',
    url: '/products',
  },
]

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'Misyonumuz',
    text:
      'Tasarımları ve rahatlığı ile ev dekorasyon trendlerine yön veren, üretim kalitesi ile de global ölçekte markalaşıp, ülke ekonomisine katkıda bulunan bir firma olmaya çalışmaktır.',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'Vizyonumuz',
    text:
      'Misyonumuz sadece ihtiyaçlara uygun mobilyalar üretmekle sınırlı olmayıp, kalite ve sınıfında en başarılı isimlerden biri olmaya çalışmaktır.',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'Hikayemiz',
    text:
      `1998'de Hanzade Doğan tarafından ilk tohumları atılan ve 2001 yılından itibaren Hepsiburada markasıyla devam ettiğimiz yolculuğumuzda bugün Türkiye'nin Hepsiburada'sı olarak, 30'dan fazla kategoride, 44 milyon ürün çeşidini müşterilerimizle buluşturuyoruz. Silikon Vadisi ile Kapalı Çarşı kültürünü, veri ile tecrübeyi harmanlayan ekibimizle, aylık 250 milyonun üzerinde ziyarete ev sahipliği yapıyoruz.*`

      
  },
  
]

export const products_url = 'https://course-api.com/react-store-products'

export const single_product_url = `https://course-api.com/react-store-single-product?id=`
