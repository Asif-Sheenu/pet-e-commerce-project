import React from 'react'
import Nav from './navbar'
import Mid from './mid'
import Footer from './footer'
import Services from './ourservice'
import Magazine from './mag'
import { Dogs } from '../dogs'
import BestSellers from './catanddog'
import Newnavbar from './newnavbar'





export const Homepage = () => {
  return (
    <div>
      
<Nav/>
<Mid/>
<BestSellers/>

<Magazine/>
<Services/>
<Footer/>
<Dogs/>

    </div>
  )
}
