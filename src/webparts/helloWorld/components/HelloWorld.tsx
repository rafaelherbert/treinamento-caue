import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { useEffect } from 'react';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export default function(props: IHelloWorldProps) {

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    console.log("AQUI!");
    const items: any[] = await sp.web.lists.getByTitle("Tarefas").items.get();
    console.log(items);
  };

  return (
    <div className={ styles.helloWorld }>
      <div className={ styles.container }>
        <div className={ styles.row }>
          <div className={ styles.column }>
            <span className={ styles.title }>Welcome to SharePoint!</span>
            <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
            <p className={ styles.description }>{escape(props.description)}</p>
            <a href="https://aka.ms/spfx" className={ styles.button }>
              <span className={ styles.label }>Learn more from Rafa</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
