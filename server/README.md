API Documentation

This documentation provides an overview of the available routes and data models for the Cohort Tools API.

All routes in this API are protected and require authentication via JWT.

<br>
🔐 Authentication

All routes are protected.

To access the API you must include a valid JWT token in the request headers:

Authorization: Bearer <your_token>


If the token is missing or invalid, the API will respond with 401 Unauthorized.

<br>
Routes

The API provides CRUD operations for cohorts and students.

<br>
Cohort routes
HTTP verb	URL	Request body	Action
GET	/api/cohorts	(empty)	Returns all cohorts
GET	/api/cohorts/:cohortId	(empty)	Returns a cohort by id
POST	/api/cohorts	JSON	Creates a new cohort
PUT	/api/cohorts/:cohortId	JSON	Updates a cohort by id
DELETE	/api/cohorts/:cohortId	(empty)	Deletes a cohort by id
<br>
Student routes
HTTP verb	URL	Request body	Action
GET	/api/students	(empty)	Returns all students (with populated cohort)
GET	/api/students/:id	(empty)	Returns a student by id
POST	/api/students	JSON	Creates a new student (requires cohort id)
PUT	/api/students/:id	JSON	Updates a student by id
DELETE	/api/students/:id	(empty)	Deletes a student by id
<br>
Models

This section describes the database schemas used in the application.

<br>
Cohort Model
Field	Data Type	Description
cohortSlug	String	Unique identifier for the cohort. Required.
cohortName	String	Name of the cohort. Required.
program	String	Program name. Required.
format	String	Format of the cohort. Required.
campus	String	Campus location. Required.
startDate	Date	Start date of the cohort. Required.
endDate	Date	End date of the cohort. Required.
inProgress	Boolean	Indicates if the cohort is in progress.
programManager	String	Program manager name. Required.
leadTeacher	String	Lead teacher name. Required.
totalHours	Number	Total program hours. Required.
<br>
Student Model
Field	Data Type	Description
firstName	String	Student first name. Required.
lastName	String	Student last name. Required.
email	String	Student email. Required and unique.
phone	String	Student phone number.
linkedinUrl	String	LinkedIn profile URL.
languages	Array of Strings	Spoken languages.
program	String	Program the student is enrolled in.
background	String	Background information.
image	String	Profile image URL.
cohort	ObjectId (ref: Cohort)	Reference to the cohort the student belongs to.
projects	Array of Strings	Student projects.
<br>
✅ Notes

All routes are protected using JWT authentication.

Student routes return populated cohort data.

The API follows REST conventions and supports full CRUD operations.

🚀 Status

✅ Authentication implemented
✅ Protected routes
✅ CRUD complete
✅ Population working