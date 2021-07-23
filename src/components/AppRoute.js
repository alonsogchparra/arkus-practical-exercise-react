import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ContactDetail } from './ContactDetail';
import { ContactList } from './ContactList';

export const AppRoute = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={ContactList} />
          <Route path="/contact/:id" component={ContactDetail} />
          <Route path="/" component={ContactList} />
        </Switch>
      </div>
    </Router>
  )
}
