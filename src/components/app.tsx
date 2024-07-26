/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import { registerCustomElement } from "ojs/ojvcomponent";
import { h } from "preact";
import { useEffect } from "preact/hooks";
import Context = require("ojs/ojcontext");
import { Footer } from "./footer";
import { Header } from "./header";
import { Content } from "./content/index";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import CoreRouter = require("ojs/ojcorerouter");
import KnockoutRouterAdapter = require("ojs/ojknockoutrouteradapter");
import UrlParamAdapter = require("ojs/ojurlparamadapter");
import "ojs/ojnavigationlist"
import {useState} from "preact/hooks";

type Props = Readonly<{
  appName?: string;
  userLogin?: string;
}>;

type RouteDetail = {
  label: string;
}

type Route = {
  path: string;
  redirect?: string; // optional property
  detail?: RouteDetail;
}

const routes: Array<Route> = [
  { path: "", redirect: "login" }, // Default route redirects to 'dashboard'
  { path: "login", detail: { label: "Login" } },
  { path: "register", detail: { label: "Register" } },
];

const dataProvider = new ArrayDataProvider<Array<Route>,Object> (routes.slice(1), {
keyAttributes: 'path',
})

const router = new CoreRouter<CoreRouter.DetailedRouteConfig>(routes, {
urlAdapter: new UrlParamAdapter(),
});

const selection = new KnockoutRouterAdapter(router);

const pageChangeHandler = (value: string) => {
console.log(value);
router.go({path: value});
}

export const App = registerCustomElement(
  "app-root",
  ({ appName = "App Name", userLogin = "john.hancock@oracle.com" }: Props) => {
    useEffect(() => {
      Context.getPageContext().getBusyContext().applicationBootstrapComplete();
    }, []);

    const [routePath, setroutePath] = useState<string>("");

    useEffect(() => {
      Context.getPageContext().getBusyContext().applicationBootstrapComplete();
      router.currentState.subscribe(routerUpdated);
      router.sync();
    }, []);

    const routerUpdated = (actionable: CoreRouter.ActionableState<CoreRouter.DetailedRouteConfig>): void => {
      const newPath = actionable.state?.path;
      setroutePath(newPath);
    }
    
    
    return (
      <div id="appContainer" class="oj-web-applayout-page">
        <Header
          appName={appName} 
          userLogin={userLogin}
          routes={routes}
          page={routePath}
          onPageChanged={pageChangeHandler}
        />
        <Content page={routePath} router={router}/>
        <Footer />
      </div>
    );
  }
);
