# **museo**

![](./public/images/museo.png)

## experience a live version of [**museo**](https://museo.onrender.com)

(register for an account for full-functionality, or login with username: test | password: test)

Use **museo** and find inspiration.

## Table of Contents

- [Overview](#overview)
- [Roadblocks](#roadblocks)
  - [Search](#site-wide-search)
  - [Filtering](#filtering-data)
  - [Validation](#form-validation)
  - [UI](#ui-design)
- [Things to Add](#things-to-add)
- [Author](#author)

## Overview

Inspired by YelpCamp by Colt Steele combined with my background/personal interest in art history.

YelpCamp is a full CRUD app built with Node, Express, and Mongo with 3 basic models. There is one basic 'index' and one basic 'show' page.

While **museo** is my first full-stack portfolio piece, I have carefully considered every aspect of its design and code to suit a production-quality app. I want **museo** to be fully usable beyond my portfolio, and I think of it as a passion project that combines my academic background as an art historian with my newfound love of web-development.

With **museo**, I have taken what I learned from YelpCamp and added:

- 4 interconnected data models, each with their own respective indices and show pages.
- Further library integrations: masonryJS, flickity, vanillatilt, imagesLoaded
- More robust validation through Joi and more intricate templating (EJS) of individual pages
- More complex and more dynamic form inputs with JS DOM manipulation
- Atlas search of the three main data models
- Multi-faceted filtering of the three main data models
- Inspiration finder: get a random artist, artwork, or museum
- Full-UI redesign using Bootstrap and significant amounts of original CSS

## Roadblocks

While it was built on the bones of my YelpCamp app, **museo** is much more complex and has a lot more moving parts. This meant a lot of research and time spent to many roadblocks along the way. A few highlights that I'm proud of my solutions for:

### Site-wide Search

Getting things to work with Atlas took a lot of trial-and-error and StackOverflow questioning. I struggled to formulate the perfect aggregate query--and also to understand what exactly an aggregate query even was. In the end, I was able to--because of the limitations of my free instance of MongoDB--have three Atlas Search indices for the names of the 3 main data structures: art, artists, and museums.

Building a dropdown search was relatively easy thanks to Bootstrap, and I was able to work with EJS to make one singular page that went for all types of search.

### Filtering Data

Similarly, filtering was very difficult for me to implement. One of the biggest roadblocks was how I structured my data: if an artist was still living, they still had a `deathDate` on their document, but it was `null`. To get around this, I ended up having to build out my JS form handler to selectively require/disable different parts of the form:

```
lifeSelect.addEventListener("click", () => {
  // enable and require the correct criteria
  birthInput.addEventListener("click", () => {
    birthInput.setAttribute("required", "");
    deathInput.removeAttribute("required");
  });
  deathInput.addEventListener("click", () => {
    deathInput.setAttribute("required", "");
    birthInput.removeAttribute("required");
  });

  birthInput.removeAttribute("disabled");
  deathInput.removeAttribute("disabled");
  submitBtn.removeAttribute("disabled");
  birthInput.setAttribute("required", "");
  deathInput.setAttribute("required", "");

  // display proper sections
  artistLifeContainer.style.display = "flex";
  artistMuseumContainer.style.display = "none";
  artistNameContainer.style.display = "none";
  submitBtn.style.display = "block";

  // disable other inputs
  nameInput.setAttribute("disabled", "").removeAttribute("required");
  museumInput.setAttribute("disabled", "").removeAttribute("required");
});
```

I also struggled with how to display these results without needing to build a new EJS view, but I was able to rely on conditionals in EJS to keep the same index view for filtered results and all results.

### Form Validation

Similarly, validating my forms was difficult. My goal was for **museo** to be an authoritative source of truth, and as such, it was important to me that all erroneous form submissions be ignored. An example of this is in the handling of the lifespan on the artist forms. For this, I used Joi--the same tool from YelpCamp, but handled in a more robust way:

```
module.exports.artistSchema = Joi.object({
  name: Joi.string().required(),
  bornDate: Joi.number().required(),
  deathDate: Joi.optional().allow("").allow(null),
}).when(Joi.object({ deathDate: Joi.exist() }), {
  then: Joi.object({
    deathDate: Joi.number().greater(Joi.ref("bornYear")),
  }),
});
```

I don't think I truly understood what Joi was doing when I was coding along with Colt. I didn't realize that it was only validating your req.body and wasn't actually validating the data, per se. It took me a lot of fiddling around with my Joi schema definitions to get the validation to where it is now, and I'm ultimately quite proud of this.

### UI Design

I'm a graphic designer by trade, and this has been a curse and a blessing. My expectations for the UI of my apps are often much higher than my technical development skills would allow, and this led me to many frustrating points. After I found MasonryJS for implementing my grid layout for the art, artist, and museum indices, I had to further complicate things (naturally) by adding decently complex custom CSS for hover states.

Prior to **museo**, I was frankly afraid of CSS. It seemed so impenetrably complex, and all of the difficult syntax was enough to make my head spin. Building the indices alone forced me to dive head-first into the deep-end of CSS, and I left this project much more confident in my ability to write custom CSS styles.

In the beginning, I was very reliant on Bootstrap (which I also was not very skilled with), and it showed in the early iterations. It looked like a very plain Bootstrap application, which, of course, is not necessarily a bad thing, but it wasn't what my designer-brain had in mind for my showpiece of an application.

By the end of working on **museo**, I was working largely in custom CSS, and because of this, when I went back to Bootstrap, I was using it differently--like a utility or a tool as opposed to the structure itself.

## Things to Add

**museo** is completely functionally done, but there are still some things I would like to add at some point down the line.

- [ ] migrate the deployment to a new service; Render is unfortunately very slow, even for a paid instance
- [ ] flesh out the about page
  - [ ] improve the copy
  - [ ] incorporate a library like Ukiyo.js for parallax effect on scroll
- [ ] edit the route for submitting the edit artwork form to optimize speed

## Author

**museo** was created with many months of passionate coding by me (Jacques Pariseau). More of my work can be found on [my portfolio](https://j-par.com)
