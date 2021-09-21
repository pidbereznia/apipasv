import {expect} from 'chai';
import TransactionsHelper from '../helpers/transaction.helper'
import UsersHelper from '../helpers/users.helper';
import ConfigHelper from '../helpers/config.helper';
describe.skip('transactions', function () {
    let transactionsHelper = new TransactionsHelper();
    let usersHelper = new UsersHelper();
    let config = new ConfigHelper();
    let userId1;
    let userId2;
    let amount = 1;
    let transactionId;

    describe('transaction creation', function () {
        before(async function () {
            await usersHelper.create();
            userId1 = usersHelper.response.body.id;
            await usersHelper.create();
            userId2 = usersHelper.response.body.id;
            await transactionsHelper.transactionCreation(userId1, userId2, amount);
        });

        it('response body contains transaction id', function () {
            expect(transactionsHelper.response.body.id).to.exist;
        });

        it('response body contains correct sender user id',  function () {
            expect(transactionsHelper.response.body.from).to.eq(userId1);
        });

        it('response body contains correct receiver user id',  function () {
            expect(transactionsHelper.response.body.to).to.eq(userId2);
        });

        it('response body contains correct amount',  function () {
            expect(transactionsHelper.response.body.amount).to.eq(amount);
        });

        it('response status code is 200', function() {
            expect(transactionsHelper.response.statusCode).to.eq(200);
        });
    });

    describe('get transaction by id', function () {
        before(async function () {
            await usersHelper.create();
            userId1 = usersHelper.response.body.id;
            await usersHelper.create();
            userId2 = usersHelper.response.body.id;
            await transactionsHelper.transactionCreation(userId1, userId2, amount);
            transactionId = transactionsHelper.response.body.id;
            await transactionsHelper.getTransactionById(transactionId);
        });

        it('response body contains correct transaction id', async function () {
            expect(transactionsHelper.response.body.id).to.eq(transactionId);
        });

        it('response body contains only object', async function () {
            expect(transactionsHelper.response.body).to.be.an('object');
        });

        it('response status code is 200', function() {
            expect(transactionsHelper.response.statusCode).to.eq(200);
        });

        it('response body contains correct sender user id', async function () {
            expect(transactionsHelper.response.body.from).to.eq(userId1);
        });

        it('response body contains correct receiver user id', async function () {
            expect(transactionsHelper.response.body.to).to.eq(userId2);
        });

        it('response body contains correct amount', async function () {
            expect(transactionsHelper.response.body.amount).to.eq(amount);
        });
    });

    after(async function (){
        await config.wipeData();
    });

});