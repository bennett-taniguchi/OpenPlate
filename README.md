# OpenPlate
CRUD application in React with yelp-fusion, local mySQL, node.js

OpenPlate is a CRUD application that runs locally on mySQL server here is the database ERD, with types and values:

# Backend ERD:

[OpenPlate Crows Foot ERD.pdf](https://github.com/bennett-taniguchi/OpenPlate/files/8499070/OpenPlate.Crows.Foot.ERD.pdf)

# Frontend:

/client contains the react app created to allow users to search for restaurants, (add a rating and) save them, add reviews, view reviews, and view
restaurant information based on search result. The default landing page is Main.js and show the functionality of the app using carousels containing cards
which are the restaurant search results for certain terms. Users can navigate using react-router at the top from the main landing page (in the middle) to
the search page on the left and enter search queries by city and tag. City is required and defaulted to 'Seattle', term isn't required but is defaulted to
'Coffee'. Users can search for result globally returned from the yelp-fusion api. They can load results by page number by click the page requested and refresh
or the search term again to reload. Results are displayed vertically, users must scroll, they can clear results as well.


