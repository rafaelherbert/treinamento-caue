import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { useEffect, useState } from 'react';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import { IItemAddResult } from "@pnp/sp/items";


interface ITask {
  Title: string;
  Description: string;
  Done: boolean;
}

export default function(props: IHelloWorldProps) {

  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    loadData();
    newItem();
  }, []);

  const newItem = async () => {
    // add an item to the list
    const iar: IItemAddResult = await sp.web.lists.getByTitle("Tarefas").items.add({
      Title: "Nova Tarefa",
      Description: "Descrição da nova tarefa",
      Done: true
    } as ITask);

    console.log(iar);
  }

  const loadData = async () => {
    const items: ITask[] = await sp.web.lists.getByTitle("Tarefas").items.get();
    setTasks(items);
  };

  return (
    <div className={styles.tasks}>
      <h1>Tarefas</h1>
      {tasks.map(x => <div className={styles.task}>
        <h1>
          {x.Title}
        </h1>
        <h2>
          {x.Description}
        </h2>
        <h3>
          {x.Done ? "Finalizada" : "Não finalizada"}
        </h3>
      </div>)}
    </div>
  );
}
