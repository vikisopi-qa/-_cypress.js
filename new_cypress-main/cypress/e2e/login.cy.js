import * as data from "../helpers/default_data.json";
import * as main_page from "../locators/main_page.json";
import * as result_page from "../locators/result_page.json";
import * as recovery_page from "../locators/recovery_password_page.json";


describe('Проверка авторизации', function () { //название спеки

     beforeEach('Начало теста', function () { // выполнять следущие действия перед началом каждого автотеста
         cy.visit('/');//посетить сайт в конфиге указали базовый урл поэтому тут только слеш
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
           });
    afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible'); // найти элемент крестик. виден пользователю

        });
   it('Верный логин и верный пароль', function () { // сейчас начнется 1й автотест
        cy.get(main_page.email).type(data.login); //найти поле логин. ввести пароль такой-то
        cy.get(main_page.password).type(data.password); //найти поле пароль. ввести пароль такой-то
        cy.get(main_page.login_button).click(); // найти кнопку войти. кликнуть
        cy.get(result_page.title).contains('Авторизация прошла успешно'); //  после автор-и найти окно. сверить текст в окне с этим
        cy.get(result_page.title).should('be.visible'); //окно с текстом видно пользователю
        
    })
       it('Проверка логики восстановления пароля', function () { // сейчас начнется 2й автотест
       
       cy.get(main_page.fogot_pass_btn).click();
       cy.get(recovery_page.email).type(data.login);
       cy.get(recovery_page.send_button).click();
       cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');

    })
     it('Ввести правильный логин и НЕправильный пароль', function () { // сейчас начнется 3й автотест
        cy.get('#mail').type(data.login); 
        cy.get('#pass').type('qa_one_love25'); //найти поле пароль. ввести НЕВЕРНЫЙ пароль
        cy.get('#loginButton').click(); // найти кнопку войти. кликнуть
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); //  после автор-и найти окно. сверить текст в окне с этим
        cy.get('#messageHeader').should('be.visible'); //окно с текстом видно пользователю
        
    })
    it('Ввести НЕправильный логин и правильный пароль', function () { // сейчас начнется 4й автотест
        
        cy.get('#mail').type('man@ya.ru'); 
        cy.get('#pass').type(data.password); //
        cy.get('#loginButton').click(); 
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); //  после автор-и найти окно. сверить текст в окне с этим
        cy.get('#messageHeader').should('be.visible'); //окно с текстом видно пользователю
        

    })
      it('Ввести логин без @ и правильный пароль', function () { // сейчас начнется n-й автотест
       
        cy.get('#mail').type('manya.ru'); 
        cy.get('#pass').type(data.password); 
        cy.get('#loginButton').click(); 
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
        cy.get('#messageHeader').should('be.visible'); 
        

    })
     it('Проверка на приведение к строчным буквам в логине:', function () { // сейчас начнется n-й автотест
       
        cy.get('#mail').type('GerMan@Dolnikov.ru'); 
        cy.get('#pass').type(data.password); 
        cy.get('#loginButton').click(); 
        cy.get('#messageHeader').contains('Авторизация прошла успешно');
        cy.get('#messageHeader').should('be.visible'); 
       

    })
})