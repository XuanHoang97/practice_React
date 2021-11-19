import React from "react";
import "./../assets/style/App.scss";
import Header from './Header';
import Mobile from './Mobile';
import Detail from "pages/Detail";
import Cart from "pages/Cart";
import CartSuccess from "pages/CartSucess";
import Payment from "pages/Payment";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { cartState$ } from "redux/selectors";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Crud from "./todos/Crud";
import CRUDHook from "./users/CRUDHook";
import Blog from "./covid/Blog";
import BlogDetail from "./covid/BlogDetail";
import Youtube from "./Youtube";
import Github from "./Github";
import Facebook from "./Facebook";
import Tiki from "./tiki/Tiki";

console.warn = () => { };

function App() {
  // Save data Cart 
  const productsCart = useSelector(cartState$)

  return (
    <Router>
      <div className="App">
        <Header />
        <ToastContainer autoClose={3000} />
        <Switch>
          <Route exact path="/"><Mobile /></Route>
          <Route exact path="/crud"><Crud /></Route>
          <Route exact path="/crudHook"><CRUDHook /></Route>
          <Route exact path="/blog"><Blog /></Route>
          <Route exact path="/blog/:id"><BlogDetail /></Route>
          <Route exact path="/search"><Youtube /></Route>
          <Route exact path="/searchGit"><Github /></Route>
          <Route exact path="/searchFb"><Facebook /></Route>
          <Route exact path="/tiki"><Tiki /></Route>


          <Route exact path="/chi-tiet-san-pham/:slug.:id.html" component={Detail} />
          <Route exact path="/gio-hang">
            {productsCart.length > 0 ? <CartSuccess /> : <Cart />}
          </Route>
          <Route exact path="/thanh-toan/"component={Payment} />
        
        </Switch>
      </div>
    </Router>
  );
}

export default App;
