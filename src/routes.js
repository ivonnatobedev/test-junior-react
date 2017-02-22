import React from 'react';
import { IndexRoute, Route }  from 'react-router';
import {App} from './components/App';
import {CustomersList} from './components/Customers';
import {ProductsList} from './components/Products';
import {InvoicesList, InvoicesNew, InvoicesEdit} from './components/Invoices';
import {NotFoundPage} from './components/NotFoudPage';
import {routes} from './const/routes';
import {titles} from './const/titles';
import { browserHistory } from 'react-router';


let currentTitle = 'App';
let currentPath = browserHistory.getCurrentLocation().pathname;
if(currentPath == '/') {
  currentTitle = titles.find(item => item.url == currentPath);
} else {
  currentTitle = titles.find(item => item.url == currentPath.split('/')[1]);
}
document.title = currentTitle == undefined ? 'Page not found' : currentTitle.title;

export default (
  <Route component={App} path={routes.home}>
    <Route path={routes.invoices.home}>
      <IndexRoute component={InvoicesList}/>
      <Route path={routes.invoices.new} component={InvoicesNew}/>
      <Route path={routes.id + routes.invoices.edit} component={InvoicesEdit}/>
    </Route>
    <Route path={routes.customers} component={CustomersList} />
    <Route path={routes.products} component={ProductsList} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);