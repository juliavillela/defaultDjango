# A default Django Project
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
    - and messages for both error and success

- ## base:
    - a basic app with no models. 
    - views:
        - index
        - dashboard
    - templates:
        - layout
            - with style and script urls
            - with basic responsive topnav(js included) and menu-button.
            - with message container with time out and transition (js included)
    - static:
        - js implementation for message and topnav
        - a sass dir with a basic starting point for style
        - the exported css file