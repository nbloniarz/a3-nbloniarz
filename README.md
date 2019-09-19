Assignment 3 - Persistence: Two-tier Web Application with Flat File Database, Express server, and CSS template
===
## Horoscope Database

http://a3-nbloniarz.glitch.me

Include a very brief summary of your project here. Images are encouraged, along with concise, high-level text. Be sure to include:

the goal of the application

challenges you faced in realizing the application

what authentication strategy / database you chose to use and why (choosing one because it seemed the easiest to implement is perfectly acceptable)

what CSS framework you used and why.

include any modifications to the CSS framework you made via custom CSS you authored.

the five Express middleware packages you used and a short (one sentence) summary of what each one does.
 
 
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
- **Madlibs Horoscope Generator**: Generates a random horoscope based on madlibs using data stored in database, and the madlibs are also editable



### Design/Evaluation Achievements
- **Toggle Menus**: Every toggled menu item is completely deleted and readded each time it is 
- **Accessability Check**: I used my website using NVDA, and found that my menus are accessable but the hide/show effect prevented the reader from announding the addition of those elements to the page
- **Design Achievement 3**: We tested the application with n=X users, finding that...
