# Farmer's Market

### **_A full-stack ecommerce website built with the MERN stack_**

#### Check out the live site [**here**](https://tinyurl.com/farmersmarketshop).

## Project Overview

Farmer's Market is a fictional e-commerce grocery store, where customers are able to add and remove products to their trolley, purchase items via PayPal, create a profile and view their order history.

Customers are also able to search for products in the menu bar, leave product reviews for and favourite their much-loved items.

Admins are able to create, read, update and delete products; edit and delete users; read and mark all orders as delivered.

### Stack

- React
- Redux
- Node.js
- Express.js
- MongoDB
- Bootstrap

## Purpose and Goal

As online shopping continues to grow and e-commerce sites number well into the millions, I wanted to be able to produce an e-commerce site using the MERN stack and tie together what I had learnt from each of the technologies in the stack.

The primary goal was to practice each of the MERN technologies, and so to speed up development I used Bootstrap for front-end framework. For state management I used a combination of Redux for global state (e.g. user context) and React Hooks for local state.

## Implementation & Features

The server uses Node.js and Express for routing the website and MongoDB for the document-driven database. I used the Mongoose library for MongoDB, as it uses schema to model data and allows for data validation. For user authentication I used JWT, and bcrypt to encrypt stored user passwords. The front-end is built with React and Bootstrap for the interface.

There a lot of features in this project, each bringing their own complexities. The Order page was particularly complex due to PayPal integration, and required a careful orchestration of events and state management for order to be updated correctly on the database. Much like designing the rest of the site, it required breaking the order payment process into individual steps. By using Redux Dev Tools I was able to ensure each step was executed as planned.

## Lessons Learned

This project helped reinforce my knowledge of React, Node.js, Express and MongoDB; and the biggest lesson learned was connecting all four together, especially in a project of this size. I found that Bootstrap was particularly useful in getting the frontend up and running quickly, however the lack of customisation proved to be a hindrance. For future updates of the site, I would add Stripe payments to expand my knowledge of payment processing.
