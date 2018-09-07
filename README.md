# Gym Buddy

Quick summary: Gym Buddy is a Node.js based web application designed to help users find a gym partner. The app is currently in a proof of concept stage, and would require many more users to match users properly.

Purpose: This app was the second group project for the UCF coding Bootcamp. It matches users with similar work out habits and preferences. This app was created specifically to help people looking for gym partners.

Contributors:   Front End: Victoria Gonzales, and Steven Martinez
                Back End: Christian Sneed, and Joseph Von Edwins

Getting Started: It's best to vist the deployed Heroku site at https://pacific-headland-82730.herokuapp.com/

Technologies:   Node.js
                Express
                HTML5
                CSS
                JavaScript
                Handlebars - templating engine
                Passport / Passport-Local - Authentication package / strategy
                Express-Sequelize-Session - Authentication session storage for prepetual login
                Cookie-Parser - Read client side cookies for authenticatin
                Bcrypt - password hashing

The GitHub repository is located at https://github.com/victoriagoesplaces/projectTwo

Details: Upon loading, users are directed to sign up or sign. New users sign up, and are added to the users list, and automatically logged in and authenticated. They are then directed to a survey page to allow proper matching. Upon submitting the survey, the user's matches are displayed. Users who have already signed up are able to login using the login page, which then directs them to their matches upon successful login. From the matches page, each user can select a potential gym buddy, and routed to the selected profile. The user can look at previous reviews for the user in question to validate whether or not this particular person would be a good gym partner.

Potential Future Improvements: 
        1. Improve matching algorithm based on user input or focus group studies.
        2. Implement location matching for users.
        3. Develop sport specific matching: EX: to set up tennis matches, golf, basketball games, etc...
        4. Add blocking mechanisms so users can block others who are acting inappropriately.
        5. Add in app messaging.
        6. Add workout trackers, stop watches, rep counters, etc... to make the app a one stop shop for fitness.
        7. Implement better and more comprehensive error checking for the input fields.