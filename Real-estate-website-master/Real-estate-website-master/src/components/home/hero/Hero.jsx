import React from "react"
import Heading from "../../common/Heading"
import "./hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading title='Trouvez une annonce qui vous convient' subtitle='Trouvez une annonce selon vos critères.' />

          <form className='flex'>
            <div className='box'>
              <span>Ville</span>
              <input type='text' placeholder='Location' />
            </div>
            <div className='box'>
              <span>Type</span>
              <input type='text' placeholder=' Type' />
            </div>
            <div className='box'>
              <span>Prix</span>
              <input type='text' placeholder='Prix' />
            </div>
            <div className='box'>
              <h4>Filtrer</h4>
            </div>
            <button className='btn1'>
              <i className='fa fa-search'></i>
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Hero
