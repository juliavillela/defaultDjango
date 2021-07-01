# trying to understand how bootstrap files work
the bootstrap scss folder is madeup of:

- a few directories;
    - they all hold underscored scss files only and are not compiled on their own.
- a bunch of component-based-named underscored scss files.
- a few underscored scss files with special purpose.
- and 4 files which actually compile into css by combining imports of the other files.

## directories and descriptions:
I looked throught each dir and file, bellow is the description of their purpose and content.
### organization directories:
these are directories that hold multiple partial files which are compiled into a single partial file with the same name as the src directory.

- __*_forms/* __ >  __*_forms.scss*__ : holds all form related classes.
- __*helpers/*__ > __*_helpers.scss*__ : #TBD
- __*mixins/*__ > __*_mixins.scss*__ : #TBD (also @import 'vendor/rfs';)

### special directories:


- __*utilities/*__
    - __*_api.scss*__ : not sure why it is called api... 
        - it has 3 groups of things it's doing.
        - breakpoints: loops through each value of global map var $grid-breakpoints uses *_mixin/_breakpoints.scss*
        - @media: apparently it sets the resposive media query. using $grid-breakpoints and rfs stuff
        - @media print - I think this prints the variables to root. 

- __*vendor/*__
        |__*_rfs.scss*__ (description: Automated responsive values for font sizes, paddings, margins and much more)

### component-based _files.scss
these files hold class declarations and styling for the specific component in the file name.
if imported into the final compiled scss, those classes will become avaiable. 
like all other files here, they use global variables declared at __*_variables.scss*__ and will inherit custom declarations of variables. 
However, there are many component specif variables to watch out for and customize in order to make the global value coherent throughout different component and classes.

### special _files.scss

- __*_utilities.scss*__: I think this is the file that sets up the helper classes in bs. like .bg-primary(that sets element background to the value of $primary)
    - content: holds a map called $utilities that defaults to an empty map, then is set to merge with a very long map declared in the file:
        - The keys are strings refering to css property names
        - the value is a map(but the keys are not quoted.) with 2 mandatory keys: 
            - property(which references the css property name) 
            - and values: yet another map which i believe holds the possible values for this property. - In many cases it also binds all this information with what i think are bs class names.
    - use: from what i understand it seems you can get the values for these $utilities keys and than call the __*_utilities/_api.scss*__ as an import and it will do something. AHA It will "generate the utility" whatever that means, using the mixin in __*_mixin/_utilities.scss*__ to interpret the map with all the values in this thing and then, i think, return a proper set of css properties and values according to the classname(ex: .margin-top-1)/ or screen width or whichever values this specific utility takes into consideration.

- __*_functions.scss*__: [Utility mixins and functions for evaluating source code across our variables, maps, and mixins.].
    - These functions are called to build the *_variables.scss* values, for instance.


- *_reboot.scss*: [sets style for default html tags]

- *_root.scss*: assigns variables at :root level and adds prefix to var name
    - The key-value pairs in $colors and $theme-colors become root variables named <prefix>-key. 
    - the same happens for $font-sans-serif, $font-monospace and $gradient.

- *_type.scsc*: [some very basic class declarations]
    - such as:
        - setting .h1 class to make any text look like an <h1>. 
        - cleaning up list formatting
        - .small for small text
        - etc.

- *_variables.scss*: [sets global value for all variables used by the other files]



### compiled files.scss
(i don't really understand why all 4 files need to compile and not just the final one...)

- *bootstrap-grid*: I think this separete file is usefull for using only the grid bootstrap system independently of other stylings.
    - @imports:
        - the basic sources: functions + variables
        - mixins: for lists, breakpoints, container, grid and utilities.
        - responsive text sizing: rfs
        - grid components: containers and grid
        - source for utilities map: utilities
    - sets up the utilities used in grid. 
    - then imports the utilities/api to render them.

- *bootstrap-reboot.scss*: implements the bootsrap reboot normalization. I guess it is it's own file to allow for using the reboot only.
    - the imports are very straigh forward: functions and variables, mixins and reboot. 
    - it also sets default font family to sans serif and default code font to monospace. before mixin and reboot import.

- *bootstrap-utilities*: I'm guessing this makes the utilities avaiable?? such as the media queries, responsive font sizing and those classes that correspond to css property values.

- *bootstrap.scss*: Implements everything declared in all the other files. 
    - imports all _files.scss.


# _variables.scss
declares all the variables for the other scss files.
_variables is imported into final bootstrap.scss, which makes variables in it globally avaiable to all other imported files and locally declared values.

## :root level declarations:
some values are declared at root level. I'm not yet sure which ones... or why...

## maps
maps work kind of like js objs. They are composed of key-value pairs. And execute nothing on their own.
A map groups toguether a bunch of values, which can then be retrieved by key, iterated through, etc.
Maps are immutable, and all operation on them actually returns a new instance of map.


## prefixes
some variables are assingned at root level with a prefix of bs-<var_name>.
- the *_root.scss* takes in certain maps and variables, adds the prefix and then assigns them to root.

- by default the declared colors in and $colors map, $colors-theme map as well as var $font-family-monospace, $font-family-sans-serif and $gradient are assigned at :root level.

[] should my custom variables have a different prefix?
[] should dark theme, for instance, be a prefix to variable names? (ex: body.dark-mode{for each color var prefix var with dm- })

## customizing global variables 
All variables declared in bootstrap *_variables.scss* have the *!default* maker, which means the value declared will only be used if no other declaration takes place.

custom value for the variables can be set safely by creating a new file, which imports all the bootstrap variables. and redeclare those that need customization.

#### setting up CUSTOM variables file:
- The custom variable file needs to import **_functions.scss** and **_variables.scss** in order to work properly. 

- It is possible to split variables custumization into multiple files, and then join them together through more layers of import.

- it seems better to name the custom variable files with a starting underscore, because it is useless to compile it in the final export.

- in the final customized bootstrap scss, the custum_variables file needs to be imported after functions and before any other bs styling component.
