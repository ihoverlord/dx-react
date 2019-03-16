#! /usr/bin/env node
const fs = require('fs')
const program = require('commander')
const ejs = require('ejs')
const _ = require('lodash')

_vName = (name) => {
    return /^[a-zA-Z]+$/.test(name)
}

generate = (name) => {
    if (!fs.existsSync('Components')) {
        fs.mkdirSync('Components')
    }
    name = name.toLowerCase()
    destination = (process.cwd()).replace(/\\/g,"/") + '/Components/' + name + '.js'
    source = (__dirname).replace(/\\/g,"/")  + '/template.js.ejs'

    ejs.renderFile(source, {cName: _.capitalize(name)}, (err, html) => {
        if (err) console.error(err);
        
        fs.writeFile(destination, html, (err) => {
            if (err) return console.log('Error : ' + err.toString());
            console.log('Component Created : Components/' + name + '.js');
        });

    });
}

doTheMagic = (input) => {
    return _vName(input) ? generate(input) : console.log('Error : Only Alphabets are allowed for name')
}

run = () => {
    program
        .version('0.1.0')
        .option('-c, --component [component]', 'Enter the name you want to create a component')
        .parse(process.argv);
    if (program.component) {
        doTheMagic(program.component)
    } else {
        console.log('Enter a name to process and generate')
    }
}


run()
