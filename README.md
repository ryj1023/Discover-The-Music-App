<h1>Discover New Music</h1>

Discover bands and artists portfolio project

<h1>Screenshots</h1>

![Screenshot](https://github.com/ryj1023/Discover-The-Music-App/blob/master/Screenshot3.png)
![Screenshot](https://github.com/ryj1023/Discover-The-Music-App/blob/master/ScreenShot1.png)
![Screenshot](https://github.com/ryj1023/Discover-The-Music-App/blob/master/ScreenShot2.png)
![Screenshot](https://github.com/ryj1023/Discover-The-Music-App/blob/master/Screenshot4.png)

<h1>Overview</h1>

This app is for anyone that's really into music (isn't everybody anyway?). Finally a place where the someone can find new sounds based on artists and bands they listen to, and also get tickets for any upcoming shows in their area. Think Spotify, YouTube, and stubhub all in one. 

<h1>Why Care?</h1>

This app provides a platform to people that are into new music, but not interested in the dealing with repetitive songs and commercials in order to do so. With this app you can search for a series of bands or aritsts that cater to your prefered genre of music.

The app's functionality includes:

* Analysis of the 100 most relevant articles returned by *The Guardian* on any given search term.
* Listing the top 6 external domains cited by *The Guardian* on any given search query with links to those sites.
* A histogram plot of the relative popularity of those top 6 sites.
* Listing the top 6 bylines associated with any given search query with Google search links associated to those bylines.
* Detailing the total number of anchor links within the articles returned by *The Guardian*'s Open Platform API.
* Detailing the total number of unique domains associated with those links.
* Suppressing internal links to *The Guardian* and key social media sites from the overall results.


<h1>Working Prototype</h1>

You can access a working prototype of the app here: https://ryj1023.github.io/Discover-The-Music-App/build/

<h1>Technical</h1>

The app is built using AngularJS for the front-end. The routes are all done in the front-end, and there are multiple views with a custom directive each display scenario. There are two API calls, one is used with a custom service and an AJAX call to obtain the quotes from the Random Famous Quotes API, and another custom service to onbtain the New York Times articles from the site's API on a conditional basis. Angular's ng-view is used based on what the user does. The default view is the homepage, which displays content based on pre-defined topics. When the user does a custom search, or selects another article content option, the ng-view is changed in response to the event and show the relative data. Angular Materials card feature is on of the dependencies used to display each article. A custom directive is returned to display the data. 

<h1>Upcoming Features</h1>

Some of the upcoming features include user profiles with custom settings, using NodeJS, MongoDB, and ExpressJS. There will also be a blog section which allows the user to create a profile and publish their own work on any topic of their choosing. 
