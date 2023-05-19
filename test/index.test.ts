import { expect } from 'chai'
import * as path from 'path'
import {
  创建表,
  创建表_从xlsx,
  表_全连接,
  表_内连接,
  表_列映射,
  表_删除列,
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
} from '../src/index'

describe('表测试', () => {
  it('测试创建表', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    const createdTable = 创建表(tableData)
    expect(表_取表数据(createdTable)).to.deep.equal(tableData)
  })
  it('测试从xlsx创建表', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    const createdTable = 创建表_从xlsx(path.resolve(__dirname, './file.xlsx'))
    expect(表_取表数据(createdTable)).to.deep.equal(tableData)
  })
  it('测试取行数据', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 创建表(tableData)
    const rowIndex = 1
    const rowData = 表_取行数据(table, rowIndex)
    expect(rowData).to.deep.equal([2, 'Bob', 30])
  })
  it('测试取行数据', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 创建表(tableData)
    const rowIndex = 999
    const rowData = 表_取行数据(table, rowIndex)
    expect(rowData).to.deep.equal(null)
  })
  it('测试取列数据', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 创建表(tableData)
    const columnIndex = 'name'
    const columnData = 表_取列数据(table, columnIndex)
    expect(columnData).to.deep.equal(['Alice', 'Bob', 'Charlie'])
  })
  it('测试取表数据', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 创建表(tableData)
    const tableDataResult = 表_取表数据(table)
    expect(tableDataResult).to.deep.equal(tableData)
  })
  it('测试取行', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 创建表(tableData)
    const rowIndex = 0
    const row = 表_取行(table, [rowIndex])
    expect(表_取表数据(row)).to.deep.equal([{ id: 1, name: 'Alice', age: 25 }])
  })
  it('测试取列', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 创建表(tableData)
    const columnIndex = 'name'
    const column = 表_取列(table, [columnIndex])
    expect(表_取表数据(column)).to.deep.equal([{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }])
  })
  it('测试表并接', () => {
    const table1 = 创建表([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ])
    const table2 = 创建表([{ age: 25 }, { age: 30 }, { age: 35 }])
    const mergedTable = 表_并接(table1, table2)
    const expectedTable = 创建表([
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ])
    expect(表_取表数据(mergedTable)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('测试左连接', () => {
    const table1 = 创建表([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ])
    const table2 = 创建表([
      { id: 1, age: 25 },
      { id: 2, age: 30 },
      { id: 4, age: 40 },
    ])
    const joinedTable = 表_左连接(table1, table2, 'id')
    const expectedTable = 创建表([
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: null },
    ])
    expect(表_取表数据(joinedTable)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('测试右连接', () => {
    const table1 = 创建表([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ])
    const table2 = 创建表([
      { id: 1, age: 25 },
      { id: 2, age: 30 },
      { id: 4, age: 40 },
    ])
    const joinedTable = 表_右连接(table1, table2, 'id')
    const expectedTable = 创建表([
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 4, name: null, age: 40 },
    ])
    expect(表_取表数据(joinedTable)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('测试全连接', () => {
    const table1 = 创建表([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ])
    const table2 = 创建表([
      { id: 1, age: 25 },
      { id: 2, age: 30 },
      { id: 4, age: 40 },
    ])
    const joinedTable = 表_全连接(table1, table2, 'id')
    const expectedTable = 创建表([
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: null },
      { id: 4, name: null, age: 40 },
    ])
    expect(表_取表数据(joinedTable)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('测试内连接', () => {
    const table1 = 创建表([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ])
    const table2 = 创建表([
      { id: 1, age: 25 },
      { id: 2, age: 30 },
      { id: 4, age: 40 },
    ])
    const joinedTable = 表_内连接(table1, table2, 'id')
    const expectedTable = 创建表([
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
    ])
    expect(表_取表数据(joinedTable)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('测试合并', () => {
    const table1 = 创建表([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ])
    const table2 = 创建表([{ id: 3, name: 'Charlie' }])
    const appendedTable = 表_合并(table1, table2)
    const expectedTable = 创建表([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ])
    expect(表_取表数据(appendedTable)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('测试筛选', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 创建表(tableData)
    const filteredTable = 表_筛选(table, (row) => row.age > 30)
    const expectedTable = 创建表([{ id: 3, name: 'Charlie', age: 35 }])
    expect(表_取表数据(filteredTable)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('测试行映射', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 创建表(tableData)
    const mappedTable = 表_行映射(table, (row) => ({
      ...row,
      name: row.name.toUpperCase(),
    }))
    const expectedTable = 创建表([
      { id: 1, name: 'ALICE', age: 25 },
      { id: 2, name: 'BOB', age: 30 },
      { id: 3, name: 'CHARLIE', age: 35 },
    ])
    expect(表_取表数据(mappedTable)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('测试删除列', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 创建表(tableData)
    const columnToRemove = 'age'
    const tableWithoutColumn = 表_删除列(table, columnToRemove)
    const expectedTable = 创建表([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ])
    expect(表_取表数据(tableWithoutColumn)).to.deep.equal(表_取表数据(expectedTable))
  })
  it('测试列映射', () => {
    let tableData = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ]
    let table = 创建表(tableData)
    const mappedTable = 表_列映射(table, 'name', (value) => value.toUpperCase())
    const expectedTable = 创建表([
      { id: 1, name: 'ALICE', age: 25 },
      { id: 2, name: 'BOB', age: 30 },
      { id: 3, name: 'CHARLIE', age: 35 },
    ])
    expect(表_取表数据(mappedTable)).to.deep.equal(表_取表数据(expectedTable))
  })
})
