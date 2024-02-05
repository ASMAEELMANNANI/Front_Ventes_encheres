import React from "react"
import Heading from "../../common/Heading"
import "./recent.css"
import RecentCard from "./RecentCard"

const Recent = () => {
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Les annonces récentes' subtitle="Explorez les dernières trouvailles, plongez dans le monde des enchères en ligne, et laissez-vous séduire par la diversité et la rareté des objets mis aux enchères sur notre site. Rejoignez-nous dans cette aventure où chaque enchère peut être le début d'une nouvelle histoire avec des trésors exceptionnels." />
          <RecentCard />
        </div>
      </section>
    </>
  )
}

export default Recent
