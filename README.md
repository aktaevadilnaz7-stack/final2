# final2
Link to GitHub Website: https://aktaevadilnaz7-stack.github.io/final2/ 

1. PROJECT DESCRIPTION 

My project is called "BlackPink Spotify". It is a responsive web application designed as a stylish music library. I took my previous Endterm project as a base and kept its topic, structure, and responsive design. The website uses a dark theme with a vibrant pink color (#ff4d8d) to create a cool retro-digital Y2K aesthetic. 

The website has 5 pages: 

Home: The landing page with a welcome hero section. 

Artists: A grid page showing top music artists. 

Gallery: A page with photos where you can filter artists by genre. 

Contact: A form page where users can send requests for playlists. 

Albums: A completely new page for the Final Project that features a dynamic data table with full CRUD functionality. 

2. LIST OF IMPLEMENTED FEATURES 

Here are the main features I implemented using HTML, CSS, JavaScript, and jQuery 3.7.1: 

Full CRUD Operations: On the Albums page, users can Create, Read, Update, and Delete album records dynamically. 

Live Search: Users can type in the search bar to filter table records instantly by artist, album name, year, or genre. 

Table Sorting: Clicking on the table headers sorts the columns in ascending or descending order. 

Login Modal Window: A global login modal that can be opened from the navigation bar on any page of the website. 

Form Validations: Real-time validation checks for the Contact form (email format, minimum characters) and the Login modal (matching passwords). 

Smooth jQuery Animations: Used built-in transitions like .show(), .hide(), .fadeOut(), .slideDown(), and .animate() to make the user interface feel smooth. 

3. TECHNICAL DETAILS 

A. CRUD Operations & DOM Manipulation 

Create: When a user clicks "+ Add New Album", a modal window opens. When the form is submitted, JavaScript checks if inputs are empty, creates a new object, pushes it into the albumData array, and renders the updated table. 

Read: I created a renderTable() function. It loops through the data array, generates the HTML for table rows dynamically, and inserts them into the table body using jQuery. 

Update: Clicking the "Edit" button opens the modal, fills the inputs with the chosen row's current data, and tracks its index. When saved, it updates the object in the array and re-renders the table. 

Delete: Clicking "Delete" shows a standard browser confirm() prompt. If the user clicks "OK", the row fades out smoothly, and the item is removed from the array. 

B. Search & Sorting System 

Search: I used the jQuery input event on the search box. It takes the input string, converts it to lowercase using .toLowerCase(), and uses the JS .filter() method to show only matching rows in real time. 

Sorting: I wrote a sortTableByField function. It toggles a boolean flag (currentSortDirection) each time a header is clicked, sorts the text or numbers in the array, and updates the table display. 

C. jQuery Animations Usage 

I made sure to include all the requested jQuery animations: 

.fadeIn() / .fadeOut(): Used for opening and closing the Login and CRUD modals smoothly. 

.slideDown(): Applied when a new row is added to the table so it appears with a nice sliding transition. 

.fadeOut(): Applied to a row when it is deleted, right before it disappears completely from the data array. 

.animate(): Used to add a custom scaling effect (transform: scale) when the CRUD modal opens, making it pop up smoothly. 

4. PROJECT STRUCTURE 

The project files are well-organized and separated into folders: 

index.html — Home page. 

artists.html — Artists list page. 

albums.html — CRUD Table page. 

gallery.html — Filterable photo gallery. 

contact.html — Feedback form page. 

css/style.css — Custom styles, colors, and layout rules. 

js/script.js — All JavaScript and jQuery code for CRUD, sorting, searching, and modals. 

5. HOW TO USE THE WEBSITE 

Navigation: Use the header menu to browse different pages. Click the "Login" button in the corner on any page to open the login form. 

Testing Login: Type a username and different passwords. You will see a pink error message saying "Passwords do not match". Make them identical and click Sign In to see a "Success!" message. 

Managing Albums (CRUD page): 

Search: Type anything in the search input (e.g., "Pop" or "2009") to filter the list instantly. 

Sort: Click on the "Artist" or "Release Year" headers to sort the table rows. 

Add: Click "+ Add New Album", fill out the form, and watch it slide down into the table. 

Edit/Delete: Use the action buttons on the right side of any row to change data or remove it. 
