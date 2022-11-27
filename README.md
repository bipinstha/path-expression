# Launch / Install in local
## Run in browser
* open index.html file in your browser

## Install as chrome extension 
* Open chrome browser and click setting
* Click on 'Extensions' on your left buttom, which will open new tab in your chrome browser
* Toggle on 'Developer mode' on your top right corner of the extensions tab
* Now you can see 'Load unpacked' menu just below the Chrome logo with 'Extensions'
* Click the 'Load unpacked' button which will open folder selection window
* Select the path-extension 'folder' which must contain 'manifext.json' file and click select button.
* Once extension is installed, it should be visible in your extensions tab, now toggle enable the extension
* Click the extension logo in your browser, you can see 'Path Expression' extension with its logo, now click on pin button. 
* Click on 'Path Expression' logo on top of your browser which will open the extension in new tab. 

# Current Functionality
* Beautify JSON data
    * Copy and paste your JSON data input text area
    * Click on JSON beautify button (i.e. { })
* Load JSON sample data
    * Click on 'Load Sample' button on bottom of the page, you can see the sample data in input text area
* Write path expression
    * In the "Expression" text box, write your expression and output will immediately change on output text box 
    * Common example of expression
        * $.*
* Common mathematical operations
    * If all the output values are numbers, enable common arithmetic values for 
        * Sum
        * Min
        * Max
        * Avg
* Link to JSON path expression website
    * If you need help on writing JSON path expression, find the link on bottom of the page "Need help on json path expression" which will be open in new tab

# What Next?
## Major Functionality
* Autocomplete functionality on Expression
    * Add functionality to have autocomplete on 'Expression' text box, on 'key up' event it should display the possible next expression.
* Add XML path expression
    * XML beautify option 
    * Load XML Sample Data
* Make this extension compatible with Firefox browser and other browsers
## Minor Functionality
* Add "Copy clipboard" on "Expression Input" and "Output"
* Auto detect JSON or XML in the input text area and change the beautify icon accordingly
    * Current beautify icon for JSON is '{ }' XML beautify icon to be added '< >'