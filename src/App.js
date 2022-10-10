//import react
import React from 'react';

//import react router dom
import { Switch, Route } from "react-router-dom";

//import component Register
import Register from './pages/Register';

//import component Login
import Login from './pages/Login';

//import component Dashboard
import Dashboard from './pages/Dashboard';

//import component Menu
import MenuView from './pages/menu/view';
import MenuEdit from './pages/menu/edit';
import MenuCreate from './pages/menu/create';

//import component Category
import CategoryView from './pages/category/view';
import CategoryEdit from './pages/category/edit';
import CategoryCreate from './pages/category/create';

//import component Tag
import TagView from './pages/tag/view';
import TagEdit from './pages/tag/edit';
import TagCreate from './pages/tag/create';

//import component User
import UserView from './pages/user/view';
import UserEdit from './pages/user/edit';
import UserCreate from './pages/user/create';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />

        <Route exact path="/menu/view" component={MenuView} />
        <Route exact path="/menu/edit/:id" component={MenuEdit} />
        <Route exact path="/menu/create" component={MenuCreate} />
        
        <Route exact path="/category/view" component={CategoryView} />
        <Route exact path="/category/edit/:id" component={CategoryEdit} />
        <Route exact path="/category/create" component={CategoryCreate} />
        
        <Route exact path="/tag/view" component={TagView} />
        <Route exact path="/tag/edit/:id" component={TagEdit} />
        <Route exact path="/tag/create" component={TagCreate} />
        
        <Route exact path="/user/view" component={UserView} />
        <Route exact path="/user/edit/:id" component={UserEdit} />
        <Route exact path="/user/create" component={UserCreate} />
      </Switch>
    </div>
  );
}

export default App;