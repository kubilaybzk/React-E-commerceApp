import React from "react";
import { useProductsContext } from "../context/products_context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";

const FeaturedProducts = () => {
  const {
    products_loading: loading,
    products_error: error,
    featured_products: featured,
  } = useProductsContext();   // Burada hook işelmleri sayesinde istediğimiz dataları elde ediyoruz.

  //Yapılmak istenen eğre bir hata varsa burada bir hata mesajı ekerana yazdırılacak bu compenenti bastırmak.
  //Eğer yükleme yapılıyorsa yükleme compenenti 
  //Eğer datalar fetch edilirken herhangi bir hata yoksa ekrana bu dataları bastıracağız.

  if (loading) {
     //Burada bilgileri çektiğimizi belli ediyoruz.
    return <Loading />
  }
  if (error) {
    //Datalar gelirken eğer bir hasta ile karşılaşıldı ise bu block çalışacak.
    return <Error />
  }
  else{
    //Herhangi bir hata yok yükleme işlemi başarı ile tamamlandı o zaman burada amacımız dataları ekrana bastıracak.

    return (
      <Wrapper className='section'>
      <div className='title'>
        <h2>featured products</h2>
        <div className='underline'></div>
      </div>
      <div className='section-center featured'>
        {featured.slice(0, 3).map((product) => {
          return <Product key={product.id} {...product} />
        })}
      </div>
      <Link to='/products' className='btn'>
        all products
      </Link>
    </Wrapper>
    )
  }

};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
