const { assert } = require('chai')

const SocialNetwork = artifacts.require("./SocialNetwork.sol")

require('chai').use(require('chai-as-promised')).should()

contract('SocialNetwork', ([deployer,author,tipper]) => { //test akun ganache
    let socialNetwork

    before(async () => {
        socialNetwork = await SocialNetwork.deployed()
    })

    describe('deplooyment', async () => {
        it('deploys successfully', async () => {
            const address = await socialNetwork.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
        it('has a name', async () => {
            const name = await socialNetwork.name()
            assert.equal(name, 'Sentimental Social Network')
        })
    })

    describe('posts', async() => {
        let result,postCount;

        it('create posts',async ()=> {
            result = await socialNetwork.createPost('This is my first post',{ from: author})
            postCount = await socialNetwork.postCount()
            //Sukses
            assert.equal(postCount, 1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is incorrect')
            assert.equal(event.content, 'this is my first post', 'content is correct')
            assert.equal(event.tipAmount, '0', 'tip amount is correct')
            assert.equal(event.author, author, 'author is correct')
        })

        // it('lists posts',async ()=> {

        // })

        // it('allows users to tip posts',async ()=> {

        // })
    })











})