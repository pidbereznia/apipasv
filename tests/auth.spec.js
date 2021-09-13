import {expect} from 'chai';
import AuthHelper from '../helpers/auth.helper';

describe('auth', function () {
    let authHelper = new AuthHelper();

    describe('successful log in', function () {

        before(async function () {
            await authHelper.get(process.env.LOGIN,process.env.PASSWORD);
        });

        it('response status code is 200 ', function () {

               expect(authHelper.response.statusCode).to.eq(200);
        });
        it('response body contains authorization token', function () {

               expect(authHelper.response.body.token).not.to.be.undefined;
        });
    });
    describe('log in with wrong credential should return error', function (){

        before(async function (){

            await authHelper.get('invalid','invalid' );

                });

        it('response status code is 404', function (){
            expect(authHelper.response.statusCode).to.eq(404);
        });

        it('response status code is 404', function (){

             expect(authHelper.response.body.message).to.eq('Wrong login or password.');


            });
        });

});