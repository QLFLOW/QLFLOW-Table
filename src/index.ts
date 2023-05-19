import { 联合转元组, 错误 } from '@lsby/ts_type_fun'
import * as XLSX from 'xlsx'
import * as R from 'ramda'

type 基础类型 = string | number | boolean | null | undefined

type _创建表_类型检查<Obj, Key> = Key extends []
  ? Obj
  : Key extends [infer x, ...infer xs]
  ? x extends keyof Obj
    ? Obj[x] extends 基础类型
      ? _创建表_类型检查<Obj, xs>
      : 错误<[x, '的类型不是基础类型']>
    : 错误<['验证失败']>
  : 错误<['解构失败']>
type 创建表_类型检查<Obj> = _创建表_类型检查<Obj, 联合转元组<keyof Obj>>
type _表_取行数据_类型<A, arr> = arr extends []
  ? []
  : arr extends [infer x, ...infer xs]
  ? x extends keyof A
    ? [A[x], ..._表_取行数据_类型<A, xs>]
    : never
  : never
type 表_取行数据_类型<A> = _表_取行数据_类型<A, 联合转元组<keyof A>>

function 读xlsx<A extends {}>(路径: string): A[] {
  const workbook = XLSX.readFile(路径)
  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]

  const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
  const columnNames: string[] = jsonData[0]
  const dataRows: any[] = jsonData.slice(1)

  const objectsArray: A[] = dataRows.map((row: any[]) => {
    const obj: any = {}
    for (let i = 0; i < columnNames.length; i++) {
      obj[columnNames[i]] = row[i]
    }
    return obj
  })

  return objectsArray
}
function 深克隆<A>(originalObject: A): A {
  return R.clone(originalObject)
}
function 表克隆<A extends {}>(a: 表<A>): 表<A> {
  return { [值]: JSON.parse(JSON.stringify(a[值])) }
}

const 值: unique symbol = Symbol('值')

export type 表<A extends {}> = {
  [值]: A[]
}

export function 创建表<A extends B, B extends {} = 创建表_类型检查<A>>(data: A[]): 表<A> {
  return { [值]: data }
}
export function 创建表_从xlsx<A extends B, B extends {} = 创建表_类型检查<A>>(路径: string): 表<A> {
  var 数据 = 读xlsx<A>(路径)
  return { [值]: 数据 }
}

export function 表_取行数据<A extends {}>(a: 表<A>, n: number): 表_取行数据_类型<A> | null {
  var d = a[值][n]
  if (d == null) return null
  return 深克隆(Object.values(d)) as any
}
export function 表_取列数据<A extends {}, B extends keyof A>(a: 表<A>, 列名: B): A[B][] {
  return 深克隆(a[值].map((x) => x[列名]))
}
export function 表_取表数据<A extends {}>(a: 表<A>): A[] {
  return 表克隆(a)[值]
}

export function 表_取行<A extends {}>(a: 表<A>, ns: number[]): 表<A> {
  return { [值]: a[值].filter((_, i) => ns.includes(i)) }
}
export function 表_取列<A extends {}, B extends keyof A>(a: 表<A>, 列名: B[]): 表<A> {
  return {
    [值]: a[值].map((x) => 列名.map((n) => ({ [n]: x[n] })).reduce((s, a) => Object.assign(s, a), {})) as any,
  }
}

export function 表_并接<A extends {}, B extends {}>(a: 表<A>, b: 表<B>): 表<A & B> {
  var 行们: Array<A & B> = []
  for (var i = 0; i < Math.max(a[值].length, b[值].length); i++) {
    行们.push({ ...a[值][i], ...b[值][i] })
  }
  return { [值]: 行们 }
}
export function 表_左连接<A extends {}, B extends {}>(
  左表: 表<A>,
  右表: 表<B>,
  链接字段: keyof A & keyof B,
): 表<A & Partial<B>> {
  const 结果: 表<A & Partial<B>> = { [值]: [] }

  for (const 左项 of 左表[值]) {
    let 匹配项找到 = false
    for (const 右项 of 右表[值]) {
      if ((左项[链接字段] as any) === (右项[链接字段] as any)) {
        结果[值].push({ ...右项, ...左项 })
        匹配项找到 = true
      }
    }
    if (!匹配项找到) {
      结果[值].push({ ...Object.fromEntries(Object.entries(右表[值][0]).map(([key]) => [key, null])), ...左项 })
    }
  }

  return 结果
}
export function 表_右连接<A extends {}, B extends {}>(
  左表: 表<A>,
  右表: 表<B>,
  链接字段: keyof A & keyof B,
): 表<Partial<A> & B> {
  const 结果: 表<Partial<A> & B> = { [值]: [] }

  for (const 右项 of 右表[值]) {
    let 匹配项找到 = false
    for (const 左项 of 左表[值]) {
      if ((左项[链接字段] as any) === (右项[链接字段] as any)) {
        结果[值].push({ ...左项, ...右项 })
        匹配项找到 = true
      }
    }
    if (!匹配项找到) {
      结果[值].push({ ...Object.fromEntries(Object.entries(左表[值][0]).map(([key]) => [key, null])), ...右项 })
    }
  }

  return 结果
}
export function 表_全连接<A extends {}, B extends {}>(
  左表: 表<A>,
  右表: 表<B>,
  链接字段: keyof A & keyof B,
): 表<Partial<A> & Partial<B>> {
  const 结果: 表<Partial<A> & Partial<B>> = { [值]: [] }

  for (const 左项 of 左表[值]) {
    let 匹配项找到 = false
    for (const 右项 of 右表[值]) {
      if ((左项[链接字段] as any) === (右项[链接字段] as any)) {
        结果[值].push({ ...左项, ...右项 })
        匹配项找到 = true
      }
    }
    if (!匹配项找到) {
      结果[值].push({
        ...左项,
        ...Object.fromEntries(Object.entries(右表[值][0]).map(([key]) => [key, null])),
        ...左项,
      })
    }
  }

  for (const 右项 of 右表[值]) {
    let 匹配项找到 = false
    for (const 左项 of 左表[值]) {
      if ((右项[链接字段] as any) === (左项[链接字段] as any)) {
        匹配项找到 = true
        break
      }
    }
    if (!匹配项找到) {
      结果[值].push({ ...Object.fromEntries(Object.entries(左表[值][0]).map(([key]) => [key, null])), ...右项 })
    }
  }

  return 结果
}
export function 表_内连接<A extends {}, B extends {}>(
  左表: 表<A>,
  右表: 表<B>,
  链接字段: keyof A & keyof B,
): 表<A & B> {
  const 结果: 表<A & B> = {
    [值]: [],
  }

  for (const 左项 of 左表[值]) {
    for (const 右项 of 右表[值]) {
      if ((左项[链接字段] as any) === (右项[链接字段] as any)) {
        结果[值].push({ ...左项, ...右项 })
      }
    }
  }

  return 结果
}

export function 表_合并<A extends {}>(a: 表<A>, b: 表<A>): 表<A> {
  const 结果: 表<A> = {
    [值]: [...深克隆(a[值]), ...深克隆(b[值])],
  }

  return 结果
}
export function 表_筛选<A extends {}>(a: 表<A>, 条件: (a: A) => boolean) {
  var 保留的 = a[值].map((x, i) => (条件(x) ? i : -1)).filter((a) => a != -1)
  return 表_取行(a, 保留的)
}
export function 表_行映射<A extends {}, C extends _C, _C extends {} = 创建表_类型检查<C>>(
  a: 表<A>,
  函数: (a: A) => C,
): 表<C> {
  var 新表 = 表克隆(a) as any
  新表[值] = 新表[值].map(函数)
  return 新表
}

export function 表_删除列<A extends {}, 列名类型 extends keyof A>(a: 表<A>, 列名: 列名类型): 表<Omit<A, 列名类型>> {
  const 结果: 表<Omit<A, 列名类型>> = {
    [值]: [],
  }

  for (const 行 of a[值]) {
    const 新行 = 深克隆(行)
    delete 新行[列名]
    结果[值].push(新行)
  }

  return 结果
}
export function 表_列映射<A extends {}, 列名类型 extends keyof A, C extends 基础类型>(
  a: 表<A>,
  列名: 列名类型,
  f: (a: A[列名类型]) => C,
): 表<Omit<A, 列名类型> & Record<列名类型, C>> {
  const 结果: 表<A & Record<列名类型, C>> = { [值]: [] }
  for (const 行 of a[值]) {
    const 新行 = 深克隆(行) as any
    delete 新行.列名
    新行[列名] = f(行[列名])
    结果[值].push(新行)
  }
  return 结果
}
