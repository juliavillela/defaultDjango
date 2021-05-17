# A default Django Project

A default django project i can use when starting a new exercise etc.
It comes with 2 apps: accounts and base.
**Accounts** holds the views and models responsible for user registration + login etc. and inherits style from base.
**Base** holds all the styling and static files, an index view,  some visualization views for style and a login required blank dashboard view.

**static files**: the main customization in base is related to the staic js and css files. The used custom_base_bs.css is a custumized minimal version of the bs files. and js includes only some very basic functionality.

## apps:
- ## accounts: 
    - user model (django Abstract Base User model)
    - views:
        - login
        - logout
        - register
    - templates:
        - simple form_page for login and register

    - success redirect to base:index on all views
    - view include messages for both error and success

- ## base:
    - a basic app with no models. 
    - views:
        - index: intro page explaining content
        - classes
        - variables
        - reboot
        - dashboard

    - templates:
        - layout
            - with style and script urls
            - with basic responsive topnav(js included) and menu-button.
            - with message container with time out and transition (js included)
    - static:
        - *master_base.js* imported as module.
        - *my_reboot.css* a custumized reboot for html tags.
        - *my_custom_base_bs.css* the compilation of my sass customized bs files.