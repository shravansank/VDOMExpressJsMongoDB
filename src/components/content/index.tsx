/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import { h } from "preact";
import { Login } from "../Login/index";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import CoreRouter = require("ojs/ojcorerouter");
import KnockoutRouterAdapter = require("ojs/ojknockoutrouteradapter");
import UrlParamAdapter = require("ojs/ojurlparamadapter");
import "ojs/ojnavigationlist"
import { Register } from "../Register/index";
import { Observable } from "ojs/ojcorerouter";

type props = Readonly<{
  page: any;
  router: CoreRouter; 
}>;

export function Content({page, router}: props) {
  console.log(page + "abcd")
  let pageContent = (page: string) => {
    switch (page) {
      case "login":
        return <Login />
        // return <Login />
      case "register":
        return <Register />
      default:
        return <h1>No page found</h1>
    }
  }
  return (
    <>
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      {pageContent(page as string)}
      {/* <Login /> */}
    </div>
    </>
  );
};
