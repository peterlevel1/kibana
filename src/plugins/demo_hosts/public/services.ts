
import { dataSource } from "./mock/datasource";
import { IDataSourceItem } from "./types";

export function getHostDetail(id: string): Promise<IDataSourceItem | null> {
  return new Promise((resolve) => setTimeout(() => resolve(dataSource.find((one: IDataSourceItem) => (one.id === id)) ?? null), 100));
}
