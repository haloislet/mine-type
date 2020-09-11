import db from './db.json'

declare global {
    interface ObjectConstructor {
        fromEntries(xs: [string|number|symbol, any][]): object
    }
}

const mineExtMap = Object
        .keys(db)
        .filter(mine =>  (<any>db)[mine].extensions)
        .reduce((acc: {[key: string]: string[]}, mine: string) => ({
            ...acc,
            [mine]: (<any>db)[mine].extensions
        }) , {})

const extMineMap= Object
        .keys(mineExtMap)
        .reduce((acc: {[key: string]: string[]} , mine: string) => {
            const extensions = mineExtMap[mine]
            const extensionItemMap = Object
                .fromEntries(
                    extensions
                        .map((extension: string) => [extension, mine])
                )
            return {
                ...acc,
                ...extensionItemMap
            }
        }, {})
class Mine {
    static getMine(ext: string):Array<string> {
        return extMineMap[ext]
    }
    static getExt (mine: string):string[] {
        return mineExtMap[mine]
    }
}

export default Mine
export const getMine = Mine.getMine
export const getExt = Mine.getExt