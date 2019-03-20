
# Welcome to dx-react!

  

Generate react things with just a command.

For beginnings, lets install the npm package.

    npm i -g dx-react

Give sudo permissions if you are on Linux/MacOS

  

## Component

  

Generate a new component from your terminal

    dx-react component YOUR_NAME

This creates a folder with the given name and adds `index.js` file  and `YOUR_NAME.css` file.

    dx-react file YOUR_NAME
    
This just creates `YOUR_NAME.js` file in your components file.

![Screen shot of to be generated code](http://i66.tinypic.com/2ldvt48.jpg)

  
  

**Rules :**

  

- Only Alphabets are allowed for a name

- No Number, Special character, spaces are allowed for a name

- A `Component` folder is created if not exists and all the generated files are stored here.

- The given name is converted to lowercase to process

  

## Router

Generate a router file

    dx-react router

No name required. This command will generate `router.js` file in your `src` folder.
![enter image description here](http://i66.tinypic.com/2ljmjab.png)
  

**Rules**

  

- Import components to your `router.js` file

- Navbar template is added. Add links as you need

- Routes template is added. Uncomment and declare routes

- Once done, change the below code in your `index.js` file.

  

`import Router from './router';`

  

`ReactDOM.render(<Router />, document.getElementById('root'));`

  

## Form

  

Generate a form template with validations, onchange events and submit function 

    dx-react form YOUR_NAME

This components folder with `YOUR_NAME` folder and `index.js` and `YOUR_NAME.css`

    dx-react form YOUR_NAME
This creates just a file with `YOUR_NAME.js` in your components folder


All component rules apply here.
