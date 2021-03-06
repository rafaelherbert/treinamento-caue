import { Description } from './components/Tasklist/style';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneSlider,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';

import * as strings from 'HelloWorldWebPartStrings';
import Tasklist from './components/Tasklist';
import { sp } from "@pnp/sp/presets/all";

export interface TasklistProps {
  itemsPerPage: number;
  description: string;
  context: WebPartContext;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<TasklistProps> {

  protected onInit(): Promise<void> {

    return super.onInit().then(_ => {

      // other init code may be present

      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement = React.createElement(
      Tasklist,
      {
        itemsPerPage: this.properties.itemsPerPage,
        description: this.properties.description,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // @ts-ignore
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneSlider('itemsPerPage', {
                  label: 'Itens por pagina',
                  min: 5,
                  max: 30,
                  value: 10,
                  showValue: true
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
