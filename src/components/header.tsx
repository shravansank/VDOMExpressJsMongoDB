/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import { h } from "preact";
import { useRef, useState, useEffect } from "preact/hooks";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import "ojs/ojtoolbar";
import "ojs/ojmenu";
import "ojs/ojbutton";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { ojNavigationList } from "ojs/ojnavigationlist";

type Props = Readonly<{
  appName: string,
  userLogin: string,
  routes: Array<Object>,
  page?: any,
  onPageChanged: (value: string) => void;
}>;

type Route = {
  path: string;
  detail: any;
}

export function Header({ appName, userLogin, routes, page, onPageChanged }: Props) {
  const [currentPage, setcurrentPage] = useState<string>(page ? page : "home");
  const routesDP = new ArrayDataProvider(routes.slice(1), { keyAttributes: "path" });

  function itemForTemplate(item: { data: any }) {
    console.log(item.data.path + " " + item.data.detail.label)
    return (
      <li id={item.data.path}>
        <a href="#">
          <label>{item.data.detail.label}</label>
        </a>
      </li>
    );
  }

  const mediaQueryRef = useRef<MediaQueryList>(window.matchMedia(ResponsiveUtils.getFrameworkQuery("sm-only")!));
  
  const [isSmallWidth, setIsSmallWidth] = useState(mediaQueryRef.current.matches);

  const onPageChangedHandler = (event: ojNavigationList.selectionChanged<Route["path"], Route>) => {
    if(event.detail.updatedFrom === "internal") {
      onPageChanged(event.detail.value);
    }
  }

  useEffect(() => {
    mediaQueryRef.current.addEventListener("change", handleMediaQueryChange);
    return (() => mediaQueryRef.current.removeEventListener("change", handleMediaQueryChange));
  }, [mediaQueryRef]);

  function handleMediaQueryChange(e: MediaQueryListEvent) {
    setIsSmallWidth(e.matches);
  }

  function getDisplayType() {
    return (isSmallWidth ? "icons" : "all");
  };

  function getEndIconClass() {
    return (isSmallWidth ? "oj-icon demo-appheader-avatar" : "oj-component-icon oj-button-menu-dropdown-icon");
  }

  return (
    <header role="banner" class="oj-web-applayout-header">
      <div class="oj-web-applayout-max-width oj-flex-bar oj-sm-align-items-center">
        <div class="oj-flex-bar-end">
        <oj-navigation-list edge="top" data={routesDP} selection={page} 
        onselectionChanged={onPageChangedHandler}
        >
              <template slot="itemTemplate" render={itemForTemplate}/>
          </oj-navigation-list>
        </div>
      </div>
    </header>
  );  
}
