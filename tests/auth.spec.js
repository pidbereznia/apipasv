import {expect} from 'chai';
import supertest from 'supertest';

describe('auth', function () {
    let result;

    describe('successful log in', function () {

        before(async function () {
            await supertest(process.env.BASE_URL)
                .post('/auth')
                .send({login: process.env.LOGIN, password: process.env.PASSWORD})
                .then(res => {
                    result = res;
                })
        });

        it('response status code is 200 ', function () {
            //     request
            //         .post('/auth')
            //         .send({login: process.env.LOGIN, password: process.env.PASSWORD})
            //         .end(function (err, res) {
            //             expect(res.statusCode).to.eq(200);
            //         });
               expect(result.statusCode).to.eq(200);
        });
        it('response body contains authorization token', function () {
            //     request
            //         .post('/auth')
            //         .send({login: process.env.LOGIN, password: process.env.PASSWORD})
            //         .end(function (err, res) {
            //              expect(res.body.token).not.to.be.undefined;
            //     });

                expect(result.body.token).not.to.be.undefined;
        });

    });
    describe('log in with wrong credential should return error', function (){

        before(async function (){

            await supertest(process.env.BASE_URL)
                .post('/auth')
                .send({login: 'wrong', password: 'wrong'})
                .then(res => {
                    result = res;
                });
        });

        it('response status code is 404', function (){
            expect(result.statusCode).to.eq(404);
        });

        it('response body contains error message', function (){

            // result.end(function (err, res){

                expect(result.body.message).to.eq('Wrong login or password.');


            });
        });

});