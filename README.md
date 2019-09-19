Assignment 3 - Persistence: Two-tier Web Application with Flat File Database, Express server, and CSS template
===
## Horoscope Database

http://a3-nbloniarz.glitch.me

The goal of the application is to calculate the zodiac signs of people entered into the database and generate a random horoscope. Both users and data can be added/modified/deleted, from the database.

Credentials:
 - username: admin, password: password
 - username: sample, password: user

Challenges:
 - Passport: Could not figure out how to integrate OAuth, so chose to use local strategy
 - Redirection: Could not figure out redirection through passport, but managed to do so using other methods (status code checking)

Authentication:
 - Strategy used: local. This was to avoid the need for accessing other accounts and it seemed the easiest.
 - Database: Firebase. This was used so I could more easily see realtime changes and get experience using free external databases.
 
CSS:
 - Framework used: Milligram. It was chosen because it was light weight and I liked the color scheme
 - Modifications: Used CSS to align and distribute buttons evenly across the page
 
Express middleware packages used:
 - Passport: Required for the project, handles authentication
 - Serve-Static: Serves static pages
 - Favicon: Serves a favicon image to the client (used a globe image)
 - Session: Stores session data for cookies
 - Cookie Parser: Allows access to data stored in cookies as json
 - Compression: Minimizes headers
 - Body-Parser: Parses request bodies into JSON objects

## Technical Achievements
- **Google Firebase Integration**: All data is stored remotely on google firebase allowing for persistance and multiple read/writes at once
- **Additional Middleware Packages Used**: Chose to use 7 middleware packages instead of the minimum of 5
- **Madlibs Horoscope Generator**: Generates a random horoscope for the user based on madlibs using data stored in database. The template was adapted from http://creative.colorado.edu/~kamc5871/web/Lab/madlib.html

### Design/Evaluation Achievements
- **Toggle Menus**: Every toggled menu item is completely deleted and readded each time it is toggled. This was done under the assumption it would help with screen readers
- **Accessability Check**: I used my website using NVDA, and found that my menus are accessable but the hide/show effect prevented the reader from announding the addition of those elements to the page
