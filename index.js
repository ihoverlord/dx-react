#! /usr/bin/env node
const fs = require('fs')
const program = require('commander')
const ejs = require('ejs')
const _ = require('lodash')

_vName = (name) => {
    return /^[a-zA-Z]+$/.test(name) 
}

generate = (name, type, folder) => {
    name = name.toLowerCase()
    if (!fs.existsSync('src/Components/')) fs.mkdirSync('src/Components/')
    console.log(folder)
    const temp = folder ? 'src/Components/'+name+'/' : 'src/Components/'
    if (folder && !fs.existsSync(temp)) fs.mkdirSync(temp) 
    else if (!folder && fs.existsSync(temp+'/'+name+'.js')) return console.log('Component file already exists : /src/Components/'+name+'.js') 

    else if(folder && fs.existsSync(temp)) return console.log('A folder with the given name already exists in the Components folder : '+temp)
    destination = folder ? process.cwd() + '/' + temp + 'index.js' : process.cwd() + '/' + temp + name + '.js'
    source = (__dirname).replace(/\\/g, "/") + '/'+type+'.js.ejs'

    ejs.renderFile(source, { cName: _.capitalize(name) }, (err, html) => {
        if (err) return console.error('2. '+err.toString());

        fs.writeFile(destination, html, (err) => {
            if (err) return console.log('1. ' + err.toString());
            console.log(type + ' Created : '+ temp + name + '.js');
            if(folder) fs.writeFileSync(temp+name+'.css'), console.log('Created : '+temp+name+'.css')
        });


    });
}

const genRouter = () => {

    destination = (process.cwd()).replace(/\\/g, "/") + '/src/router.js'
    source = (__dirname).replace(/\\/g, "/") + '/router.template.js'

    if(fs.existsSync(destination)) return console.log('File already exists : '+destination)

    fs.copyFile(source, destination, (err) => {
        if (err) return console.log(err.toString());
        console.log('Router template generated. Now follow these steps : ');
        console.log(' ')
        console.log('Open router.js file, Import Components and Create Routes. ')
        console.log('Navbar template has been added, update the navbar with router links')
        console.log(' ')
        console.log('One last step :')
        console.log(' ')
        console.log('Go to index.js file and copy paste the below code : ')
        console.log("import Router from './router';")

        console.log("ReactDOM.render(<Router />, document.getElementById('root'));")
        console.log(' ')
        console.log('You are done. Now!!!')
    });

}

doTheMagic = (input, type, folder) => {
    if (!fs.existsSync('package.json')) return console.log('You are not on a project file. Package.json file is missing')
    if(!_vName(input)) return console.log(_vName(input)+'Error : Only Alphabets are allowed for name')
    if(type === 'router') return genRouter()
    generate(input, type, folder) 
}

run = () => { 
    program
        .version('0.1.0')
        .option('component [component]', 'Enter  the name you want to create a component in a folder with css files')
        .option('form [form]', 'Enter name for the component form to be created in a folder with css')
        .option('file [file]', 'Enter the name you want to create a component')
        .option('justform [justform]', 'Enter the name you want to create a form')
        .option('router [router]', 'Create router')
        .parse(process.argv);
    if (program.component) doTheMagic(program.component, 'component', true)
    if (program.form) doTheMagic(program.form, 'form', true)
    if (program.file) doTheMagic(program.file, 'component', false)
    if (program.justform) doTheMagic(program.justform, 'form', false)
    if (program.router) genRouter()
}


run()
