# atelier

# Overview
Atelier is a front-end clothing retailer portal that allows a consumer to search for products, view product details, contribute questions and answers, contribute product ratings and reviews, and see product suggestions. The site makes API calls to a third-party database and displays in the information requested by a user, and therefore does not include a back-end database within the project scope.

# Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Description](#description)
  - [Product Detail Page](#product-detail-page)
  - [Related Products and Product Comparisons](#related-products-and-product-comparisons)
- [Usage](#usage)
- [Contributors](#contributors)


# Description

## Product Detail Page
The Product Detail Page allows the consumer to view product information, browse through the product's different styles, view images of the product in an image gallery, and add items to a shopping cart.

## Related Products and Product Comparisons
The Related Products and Product Comparisons widgets allow the consumer to view products related to the product they are currently viewing, compare their current product with related products, and build an outfit with their favorite items.

## Questions and Answers
The Questions and Answers widget allows the user to view previously submitted questions and answers submitted by other users for each question. The user can search for existing questions, contribute answers to existing questions, and add new questions. They can also expand and collapse the questions and their corresponding answers. New question and answers are submitted via forms completed by the user.

## Ratings and Reviews
The Ratings and Reviews widget allows the consumer to see an average star rating for the product they are currently viewing. They can also see how previous consumers have rated the product on a variety of characteristics like fit, length, etc. These characteristics are displayed in a sliding Likert scale. They can read individual reviews, sort through reviews based on relevance and submittion date, and filter reviews by star rating. Upon clicking a button, they can submit a new review using a form that allows a user to submit a star rating, comments, and ratings on characteristics specific to the product.


# Installation
1. In the terminal, run the following script to install all dependencies:
  ```
  npm install
  ```

2. Then navigate to the root directory & create a `.env` file, being sure to specify the following environment variables:
  ```
  PORT=<DESIRED PORT NUMBER>
  MODE="development"
  API_URL="https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp"
  API_KEY=<GITHUB API KEY HERE>
  ```

3. To begin watching files for bundling, run the following script:
  ```
  npm run server-dev
  ```

4. Once all files have finished compiling via webpack, navigate to the following link within your preferred browser:
  ```
  localhost:<PORT>
  ```

---

# Contributors
- Alex Yamaguchi
- Vicky Lee
- Shay Lynes
- Charlene Diep