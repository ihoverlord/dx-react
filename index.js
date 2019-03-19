#! /usr/bin/env node
const fs = require('fs')
const program = require('commander')
const ejs = require('ejs')
const _ = require('lodash')

_vName = (name) => {
    return /^[a-zA-Z]+$/.test(name)
}

generate = (name) => {
    if (!fs.existsSync('src/Components')) {
        fs.mkdirSync('src/Components')
    }
    name = name.toLowerCase()
    destination = (process.cwd()).replace(/\\/g, "/") + '/src/Components/' + name + '.js'
    source = (__dirname).replace(/\\/g, "/") + '/component.js.ejs'

    ejs.renderFile(source, { cName: _.capitalize(name) }, (err, html) => {
        if (err) console.error(err);

        fs.writeFile(destination, html, (err) => {
            if (err) return console.log('Error : ' + err.toString());
            console.log('Component Created : src/Components/' + name + '.js');
        });

    });
}

const genRouter = () => {

    fs.copyFile('router.template.js', '/src/router.js', (err) => {
        if (err) return console.log(err.toString());
        console.log('Router template generated. Now follow these steps : ');
        console.log('Open router.js file, Import Components and Create Routes. ')
        console.log('Navbar template has been added, update the navbar with router links')
        console.log('One last step :')
        console.log('Go to index.js file and copy paste the below code : ')
        console.log("import Router from './router';")

        console.log("ReactDOM.render(<Router />, document.getElementById('root'));")
        console.log('You are done. Now!!!')
    });

}

doTheMagic = (input) => {
    return _vName(input) ? generate(input) : console.log('Error : Only Alphabets are allowed for name')
}

run = () => {
    program
        .version('0.1.0')
        .option('-c, --component [component]', 'Enter the name you want to create a component')
        .option('-r, --router [router]', 'Create router')
        .parse(process.argv);
    if (program.component) {
        doTheMagic(program.component)
    } else {
        console.log('Enter a name to process and generate')
    }
    if (program.router) genRouter()
}


run()
