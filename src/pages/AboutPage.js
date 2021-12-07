import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import aboutImg from "../assets/hero-bcg.jpeg";


const text=`
1998 yılında "En yeni iletişim ve bilgisayar teknolojilerini
            kullanarak müşterilerine dünya standartlarında çözümler sunmak"
            ilkesiyle yola çıkan kubilaybzk.com, geçen 2 aylık süreçte kendini 
            en kısa sürede react ile uygulama geliştirecek duruma getirmiş biri olmayı
            başarmıştır. 2021 Kasım  ayında react ile uygulama geliştirmeye başlamış ve bu sayede 
            2021 Aralık ayında bu web sitesini yapabilecek duruma gelmiştir. 
            2010 yılından beri Türkiye'nin en büyük 500 e-ticaret uygulaması arasında yer
            alacak bir uygulama geliştirmeyi hedeflemektedir.
            `

  
const AboutPage = () => {
  return (
    <main>
      <PageHero title='Hakkımızda' />
      <Wrapper className='page section section-center'>
        <img src={aboutImg} alt='nice desk' />
        <article>
          <div className='title'>
            <h2>Biz Kimiz?</h2>
            <div className='underline'></div>
          </div>
          <p>
            {text}
          </p>
        </article>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
