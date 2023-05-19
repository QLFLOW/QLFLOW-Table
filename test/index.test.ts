import { add } from '../src'
import { expect } from 'chai'

describe('测试组1', function () {
  it('测试项1', async function () {
    var result = add(1, 2)
    expect(result).to.equal(3)
  })
})
