import db from './db.json';

declare global {
  interface ObjectConstructor {
    fromEntries(xs: any[]): object;
  }
}

const mineExtMap = Object.keys(db)
  .filter(mine => (db as any)[mine].extensions)
  .reduce(
    (acc: { [key: string]: string[] }, mine: string) => ({
      ...acc,
      [mine]: (db as any)[mine].extensions,
    }),
    {}
  );

const extMineMap = Object.keys(mineExtMap).reduce(
  (acc: { [key: string]: string }, mine: string) => {
    const extensions: string[] = mineExtMap[mine];
    const extensionItemMap = Object.fromEntries(
      extensions.map((extension: string) => [extension, mine])
    );
    return {
      ...acc,
      ...extensionItemMap,
    };
  },
  {}
);
class Mine {
  static getMine(ext: string): string {
    return extMineMap[ext];
  }
  static getMines(...exts: Array<string | string[]>): string[] {
    const allExts = exts.flat();
    return [...new Set(allExts.map(ext => extMineMap[ext]).flat())];
  }
  static getExt(mine: string): string[] {
    return mineExtMap[mine];
  }
  static getExts(...mines: Array<string | string[]>): string[] {
    const allMines = mines.flat();
    return [...new Set(allMines.map(mine => mineExtMap[mine]).flat())];
  }
}

export default Mine;
export const getMine = Mine.getMine;
export const getExt = Mine.getExt;
export const getMines = Mine.getMines;
export const getExts = Mine.getExts;
