import "./App.css"
import React from "react"
import Header from "./components/common/header/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./components/home/Home"
import Footer from "./components/common/footer/Footer"
import About from "./components/about/About"
import annonces from "./components/annonce/Annonces"
import Services from "./components/services/Services"
import Contact from "./components/contact/Contact"
import publierAnnonce from "./components/annonce/PublierAnnonce";
import Details from "./components/annonce/Details";
import signIn from "./components/Auth/SignIn";
import Registration from "./components/Auth/Registration"
import AdvertisementCard from "./components/annonce/validerAnnonce";
import DetailsPage from "./components/annonce/DetailsPage";
import Profile from "./components/profile/profile";
import DetailAnnonce from "./components/annonce/DetailsAnnonce"
import MesAnnonces from "./components/annonce/MesAnnonces"
import NewPageDetails from "./components/annonce/NewPageDetails"
import AllAnnonces from "./components/annonce/AllAnnonces"
function App() {

  
  return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/services' component={Services} />
            <Route exact path='/annonces' component={annonces} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/publierAnnonce' component={publierAnnonce}/>
            <Route exact path='/signIn' component={signIn}/>
            <Route exact path='/signup' component={Registration}/>
            <Route exact path='/valider' component={DetailsPage}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path='/detailAnnonce' component={DetailAnnonce}/>
            <Route exact path='/mesAnnonces' component={MesAnnonces}/>
            <Route exact path='/newdetails' component={NewPageDetails}/>
            <Route exact path='/allannonces' component={AllAnnonces}/>
            {/*<Route exact path='/Details' component={Details}/>*/}
            {/*<Route path='/Details/:id/:product_name/:category/:date_deb/:date_fin/:bestPrice' component={Details}/>*/}
            <Route path='/Details/:id/:category/:name' component={Details}/>
          </Switch>
          <Footer />
        </Router>
      </>
  )
}

export default App
