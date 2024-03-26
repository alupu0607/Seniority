# Device Web Recommender

## Description

Device Web Recommender is a web application that recommends electronic devices (phones, headphones, laptops, smartwatches, cameras, tablets, keyboards, mouses, PC's, TV's ...) to users based on price or other characteristics - e.g., similar model, facilities, color, autonomy etc.
The analyzed data will be taken from multiple sources (via scraping) offered by profile sites that can be specified by the user. Statistics of the most popular products and the generated recommendations will also be available as RSS news feeds.

## Installation

```bash
# Clone this repository
git clone git@github.com:halexandru11/DeviceWebRecommender.git
# Go into the repository directory
cd DeviceWebRecommender
```

## Technologies
- Front-end: SASS, BEM, CSS, HTML, JavaScript
- Back-end: Express, Node.js, JavaScript, PostgreSql, Passport.js

## Features
- MVC architecture 
- SQL injection prevention via Sequelize queries
- Complete authentication
- Administrator module (RESTful API for manipulating user data, import CSV + JSON files)
- Scraper which automatically retrieves data from Emag, Altex, and MediaGalaxy and runs on a weekly schedule.


## Usage

To run this project, you need to have [Node.js](https://nodejs.org/en/) installed on your computer.
After installing **Node.js**, run the following commands in the project directory:

```bash
# Install dependencies
npm install
# Run the app
npm start
# The app will be available at http://localhost:3000/
open http://localhost:3000/
```

## Project status

In progress

## Authors

- Lupu Andreea-Daniela
- Hrițcan Alexandru

## License

[MIT](https://choosealicense.com/licenses/mit/)
