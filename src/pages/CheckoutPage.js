import React from 'react'
import styled from 'styled-components'
import { PageHero, StripeCheckout } from '../components'
// extra imports
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'

const CheckoutPage = () => {
  return <main>
    <PageHero title="kontrol"/>
    <Wrapper className='page'></Wrapper>
    <h1>Buranın tasarımı henüz hazır değil .</h1>
  </main>
}
const Wrapper = styled.div``
export default CheckoutPage
