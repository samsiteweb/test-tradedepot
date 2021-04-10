import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UploadProduct from './pages/UploadProducts';
import ProductDetails from './pages/ProductDetails';
import NavBar from './components/NavBar'
import {verifyToken} from './checkValidToken'
import ProtectedRoute from './ProtectedRoute'
function App() {
 
  
  let isExpired = true;

    isExpired = verifyToken();
    
  

  return (
    <> 
    <Switch>
      <Route exact path="/"  component={Login}/>
      <Route exact path="/reg" component={Register} />
      <ProtectedRoute isExpired={isExpired} exact path="/dashboard" component={Dashboard} />
      <ProtectedRoute isExpired={isExpired} exact path="/upload" component={UploadProduct} />
      <ProtectedRoute isExpired={isExpired} exact path="/product-details/:id" component={ProductDetails} />
      </Switch>
    </>
  );
}

export default App;
