![alt text](https://g.foolcdn.com/misc-assets/black-fool-hat-text.svg "The Motley Fool Logo")

# Submission Setup
```
cd backend
pip install -r requirements.txt
python minimal.py runserver```

Then, navigate to the frontend directory:
```cd ..
cd frontend
npm install
npm start```

You should now be able to access the app from http://localhost:3000. Please see the README in /frontend for more information.

# Marketing Front End Developer Test Project

Hello potential Fool!  We’d love to give you the chance to show off your skills and impress us!  We want to see how you would create a landing page, how you communicate, and how you solve problems.  This is your chance to demonstrate skills beyond what we can see from your resume and from a talking-only interview.

If you are familiar with all the technologies we are requesting that you use for this challenge, we estimate it will take around **12-20 hours to complete**.  If you are learning some of these particular tools for the first time, it may take you longer, and that’s OK! Just keep us in the loop as to how things are going.  Feel free to spend more time on it if you are on a roll and can’t stop the awesome!

## What are we looking for:

*   Professional development work (clean, well-organized, appropriate comments, unit tests, no loose ends, no sloppy spelling, no browser console errors).
*   Creative problem solving 
*   Solid analytical approach - are you solving the business problem, or just writing code?
*   Good communication with us as you are working on the project, so we can get a feel for what it would be like to work with you!



## The Challenge
One of our marketing copy writers wants to create a landing page to pitch The Motley Fool's flagship investing service, Stock Advisor.
They have provided the copy (landing-page-copy.txt) and would like to see what you can come up with.  Although we are evaluating your technical implementation (not your design skills), you have license to be as aesthetically creative as you like with your solution.  

### Business Requirements

*   Clearly conveys the marketing message (`landing-page-copy.txt`)
*   Needs to perform quickly on desktop and mobile.
*   Displays "live" top 5 best performing recommendations (http://127.0.0.1:8000/recs).
*   Create a button that allows visitors to reveal 5 more recommendations (in random order). 
*   Must show "live" Motley Fool disclosure (http://127.0.0.1:8000/disclosure).
*   Provide a form for people to submit their email address



### Technical Requirements

*   Form submission should be done via AJAX call to the django project's `/add_to_campaign` path 
*   A successful response from the email POST should:
      * instantiate `FoolTracker` and call the `trackEvent` method, include any properties you feel would be useful
      * send users to the `campaign_url` in the response from the POST
*   Responsive for desktop (including large monitors) and mobile
*   Ideally works in IE11, as well as the latest Safari, Edge, Firefox, and Chrome
*   Code considers non-happy-paths


## Project Guidelines and Setup
1. Host the project code on github
1. This is based on Django 2.x series, you'll need to be running python3
1. You'll need to get python/django running on your computer. If you do not already have an environment the Django website outlines how to get up and running.
    * If you're comfortable doing this yourself great! If not here are some guides.
    * Windows: https://docs.djangoproject.com/en/2.2/howto/windows/
    * Mac: https://gist.github.com/hakjoon/216be7abdb5746eb579656102b91d6e3 or https://medium.com/riow/how-to-setup-a-django-development-environment-on-mac-968d129bc661
1. Install Django 2.x packages via:

   ```pip install -r requirements.txt``` 
  
    (`pip` may be `pip3` depending on how you install everything)

Once that completes you can run:

```
python minimal.py runserver
```

Open the project via http://127.0.0.1:8000 in your web browser.
