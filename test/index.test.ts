import { expect } from 'chai'
import * as path from 'path'
import {
  表_创建表,
  表_从xlsx创建表,
  表_全连接,
  表_内连接,
  表_列映射,
  表_列删除,
  表_取列,
  表_取列数据,
  表_取行,
  表_取行数据,
  表_取表数据,
  表_右连接,
  表_合并,
  表_左连接,
  表_并接,
  表_筛选,
  表_行映射,
  表_取行数,
  表_取列数,
  表_取列名们,
  表_表映射,
  表_分组,
  表_表排序,
  表_交叉分组,
  表_交叉归类,
  表_创建列表,
  表_创建行表,
  表_列改名,
  表_表去重,
} from '../src/index'

describe('表测试', () => {
  it('表_创建表', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    const createdTable = 表_创建表(tableData)
    expect(表_取表数据(createdTable)).to.deep.equal(tableData)
  })
  it('表_创建行表', () => {
    let tableData = [{ id: 1, name: 'Alice', age: 25 }]
    const createdTable = 表_创建行表(['id', 'name', 'age'], [1, 'Alice', 25])
    expect(表_取表数据(createdTable)).to.deep.equal(tableData)
  })
  it('表_创建列表', () => {
    let tableData = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const createdTable = 表_创建列表([1, 2, 3], 'id')
    expect(表_取表数据(createdTable)).to.deep.equal(tableData)
  })
  it('表_从xlsx创建表', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    const createdTable = 表_从xlsx创建表(path.resolve(__dirname, './file.xlsx'))
    expect(表_取表数据(createdTable)).to.deep.equal(tableData)
  })
  it('表_创建高维表', () => {
    const createdTable = 表_创建表([
      { id: 1, data: 表_创建表([{ name: 'Alice', age: 25 }]) },
      { id: 2, data: 表_创建表([{ name: 'Bob', age: 30 }]) },
      { id: 3, data: 表_创建表([{ name: 'Charlie', age: 35 }]) },
    ])
    expect(表_取表数据(表_取列数据(createdTable, 'data')[1])).to.deep.equal([{ name: 'Bob', age: 30 }])
  })
  it('表_取行数据', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 表_创建表(tableData)
    const rowIndex = 1
    const rowData = 表_取行数据(table, rowIndex)
    expect(rowData).to.deep.equal([2, 'Bob', 30])
  })
  it('表_取行数据(越界)', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 表_创建表(tableData)
    const rowIndex = 999
    const rowData = 表_取行数据(table, rowIndex)
    expect(rowData).to.deep.equal(null)
  })
  it('表_取列数据', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 表_创建表(tableData)
    const columnIndex = 'name'
    const columnData = 表_取列数据(table, columnIndex)
    expect(columnData).to.deep.equal(['Alice', 'Bob', 'Charlie'])
  })
  it('表_取表数据', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 表_创建表(tableData)
    const tableDataResult = 表_取表数据(table)
    expect(tableDataResult).to.deep.equal(tableData)
  })
  it('表_取行数', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 表_创建表(tableData)
    expect(表_取行数(table)).to.deep.equal(3)
  })
  it('表_取列数', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 表_创建表(tableData)
    expect(表_取列数(table)).to.deep.equal(3)
  })
  it('表_取列名们', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 表_创建表(tableData)
    expect(表_取列名们(table)).to.deep.equal(['id', 'name', 'age'])
  })
  it('表_取行', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 表_创建表(tableData)
    const rowIndex = 0
    const row = 表_取行(table, [rowIndex])
    expect(表_取表数据(row)).to.deep.equal([{ id: 1, name: 'Alice', age: 25 }])
  })
  it('表_取列', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 表_创建表(tableData)
    const column = 表_取列(table, ['name'])
    expect(表_取表数据(column)).to.deep.equal([{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }])
  })
  it('表_表并接', () => {
    const table1 = 表_创建表([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ])
    const table2 = 表_创建表([{ age: 25 }, { age: 30 }, { age: 35 }])
    const mergedTable = 表_并接(table1, table2)
    const expectedTable = 表_创建表([
      { A_id: 1, A_name: 'Alice', B_age: 25 },
      { A_id: 2, A_name: 'Bob', B_age: 30 },
      { A_id: 3, A_name: 'Charlie', B_age: 35 },
    ])
    expect(表_取表数据(mergedTable)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('表_左连接', () => {
    const table1 = 表_创建表([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 2, name: 'Benjamin' },
      { id: 3, name: 'Charlie' },
      { id: 4, name: 'Dasan' },
    ])
    const table2 = 表_创建表([
      { id: 1, age: 25 },
      { id: 1, age: 26 },
      { id: 2, age: 30 },
      { id: 3, age: 40 },
      { id: 5, age: 50 },
    ])
    const joinedTable = 表_左连接(table1, table2, 'id')
    const expectedTable = 表_创建表([
      { id: 1, A_name: 'Alice', B_age: 25 },
      { id: 1, A_name: 'Alice', B_age: 26 },
      { id: 2, A_name: 'Bob', B_age: 30 },
      { id: 2, A_name: 'Benjamin', B_age: 30 },
      { id: 3, A_name: 'Charlie', B_age: 40 },
      { id: 4, A_name: 'Dasan', B_age: null },
    ])
    expect(表_取表数据(joinedTable)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('表_右连接', () => {
    const table1 = 表_创建表([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 2, name: 'Benjamin' },
      { id: 3, name: 'Charlie' },
      { id: 4, name: 'Dasan' },
    ])
    const table2 = 表_创建表([
      { id: 1, age: 25 },
      { id: 1, age: 26 },
      { id: 2, age: 30 },
      { id: 3, age: 40 },
      { id: 5, age: 50 },
    ])
    const joinedTable = 表_右连接(table1, table2, 'id')
    const expectedTable = 表_创建表([
      { id: 1, A_name: 'Alice', B_age: 25 },
      { id: 1, A_name: 'Alice', B_age: 26 },
      { id: 2, A_name: 'Bob', B_age: 30 },
      { id: 2, A_name: 'Benjamin', B_age: 30 },
      { id: 3, A_name: 'Charlie', B_age: 40 },
      { id: 5, A_name: null, B_age: 50 },
    ])
    expect(表_取表数据(joinedTable)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('表_全连接', () => {
    const table1 = 表_创建表([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 2, name: 'Benjamin' },
      { id: 3, name: 'Charlie' },
      { id: 4, name: 'Dasan' },
    ])
    const table2 = 表_创建表([
      { id: 1, age: 25 },
      { id: 1, age: 26 },
      { id: 2, age: 30 },
      { id: 3, age: 40 },
      { id: 5, age: 50 },
    ])
    const joinedTable = 表_全连接(table1, table2, 'id')
    const expectedTable = 表_创建表([
      { id: 1, A_name: 'Alice', B_age: 25 },
      { id: 1, A_name: 'Alice', B_age: 26 },
      { id: 2, A_name: 'Bob', B_age: 30 },
      { id: 2, A_name: 'Benjamin', B_age: 30 },
      { id: 3, A_name: 'Charlie', B_age: 40 },
      { id: 4, A_name: 'Dasan', B_age: null },
      { id: 5, A_name: null, B_age: 50 },
    ])
    expect(表_取表数据(joinedTable)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('表_内连接', () => {
    const table1 = 表_创建表([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 2, name: 'Benjamin' },
      { id: 3, name: 'Charlie' },
      { id: 4, name: 'Dasan' },
    ])
    const table2 = 表_创建表([
      { id: 1, age: 25 },
      { id: 1, age: 26 },
      { id: 2, age: 30 },
      { id: 3, age: 40 },
      { id: 5, age: 50 },
    ])
    const joinedTable = 表_内连接(table1, table2, 'id')
    const expectedTable = 表_创建表([
      { id: 1, A_name: 'Alice', B_age: 25 },
      { id: 1, A_name: 'Alice', B_age: 26 },
      { id: 2, A_name: 'Bob', B_age: 30 },
      { id: 2, A_name: 'Benjamin', B_age: 30 },
      { id: 3, A_name: 'Charlie', B_age: 40 },
    ])
    expect(表_取表数据(joinedTable)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('表_合并', () => {
    const table1 = 表_创建表([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ])
    const table2 = 表_创建表([{ id: 3, name: 'Charlie' }])
    const appendedTable = 表_合并(table1, table2)
    const expectedTable = 表_创建表([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ])
    expect(表_取表数据(appendedTable)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('表_筛选', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 表_创建表(tableData)
    const filteredTable = 表_筛选(table, (row) => row.age > 30)
    const expectedTable = 表_创建表([{ id: 3, name: 'Charlie', age: 35 }])
    expect(表_取表数据(filteredTable)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('表_行映射', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 表_创建表(tableData)
    const mappedTable = 表_行映射(table, (row) => ({
      ...row,
      name: row.name.toUpperCase(),
    }))
    const expectedTable = 表_创建表([
      { id: 1, name: 'ALICE', age: 25 },
      { id: 2, name: 'BOB', age: 30 },
      { id: 3, name: 'CHARLIE', age: 35 },
    ])
    expect(表_取表数据(mappedTable)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('表_分组', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 表_创建表(tableData)
    const 分组 = 表_分组(table, [(x) => x.age <= 30, (x) => x.age >= 30])
    const expectedTable1 = 表_创建表([
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
    ])
    const expectedTable2 = 表_创建表([{ id: 3, name: 'Charlie', age: 35 }])
    expect(表_取表数据(expectedTable1)).to.deep.equal(表_取表数据(分组[0]))
    expect(表_取表数据(expectedTable2)).to.deep.equal(表_取表数据(分组[1]))
  })
  it('表_交叉分组', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 表_创建表(tableData)
    const 分组 = 表_交叉分组(table, [(x) => x.age <= 30, (x) => x.age >= 30])
    const expectedTable1 = 表_创建表([
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
    ])
    const expectedTable2 = 表_创建表([
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ])
    expect(表_取表数据(expectedTable1)).to.deep.equal(表_取表数据(分组[0]))
    expect(表_取表数据(expectedTable2)).to.deep.equal(表_取表数据(分组[1]))
  })
  it('表_交叉归类', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 表_创建表(tableData)
    const 分组 = 表_交叉归类(table, { a: (x) => x.age <= 30, b: (x) => x.age >= 30 })
    const expectedTable1 = 表_创建表([
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
    ])
    const expectedTable2 = 表_创建表([
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ])
    expect(表_取表数据(expectedTable1)).to.deep.equal(表_取表数据(分组.a))
    expect(表_取表数据(expectedTable2)).to.deep.equal(表_取表数据(分组.b))
  })
  it('表_删除列', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 表_创建表(tableData)
    const columnToRemove = 'age'
    const tableWithoutColumn = 表_列删除(table, columnToRemove)
    const expectedTable = 表_创建表([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ])
    expect(表_取表数据(tableWithoutColumn)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('表_列改名', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 表_创建表(tableData)
    const tableWithoutColumn = 表_列改名(table, 'name', 'name1')
    const expectedTable = 表_创建表([
      { id: 1, name1: 'Alice', age: 25 },
      { id: 2, name1: 'Bob', age: 30 },
      { id: 3, name1: 'Charlie', age: 35 },
    ])
    expect(表_取表数据(tableWithoutColumn)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('表_列映射', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 表_创建表(tableData)
    const mappedTable = 表_列映射(table, 'name', (value) => value.toUpperCase())
    const expectedTable = 表_创建表([
      { id: 1, name: 'ALICE', age: 25 },
      { id: 2, name: 'BOB', age: 30 },
      { id: 3, name: 'CHARLIE', age: 35 },
    ])
    expect(表_取表数据(mappedTable)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('表_表映射', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 表_创建表(tableData)
    const mappedTable = 表_表映射(table, (a) => a.sort((a, b) => b.id - a.id))
    const expectedTable = 表_创建表([
      { id: 3, name: 'Charlie', age: 35 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 1, name: 'Alice', age: 25 },
    ])
    expect(表_取表数据(mappedTable)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('表_表排序', () => {
    let tableData = [
      { id: 2, name: 'Bob', age: 30 },
      { id: 1, name: 'Alice', age: 25 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 表_创建表(tableData)
    const mappedTable1 = 表_表排序(table, (a, b) => b.id > a.id)
    const mappedTable2 = 表_表排序(table, (a, b) => a.id > b.id)
    const expectedTable1 = 表_创建表([
      { id: 3, name: 'Charlie', age: 35 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 1, name: 'Alice', age: 25 },
    ])
    const expectedTable2 = 表_创建表([
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ])
    expect(表_取表数据(mappedTable1)).to.deep.equal(表_取表数据(expectedTable1))
    expect(表_取表数据(mappedTable2)).to.deep.equal(表_取表数据(expectedTable2))
  })
  it('表_表去重', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Alice', age: 25 },
    ]
    let table = 表_创建表(tableData)
    const mappedTable = 表_表去重(table, ['name', 'age'])
    const expectedTable = 表_创建表([
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
    ])
    expect(表_取表数据(mappedTable)).to.deep.equal(表_取表数据(expectedTable))
  })
})
