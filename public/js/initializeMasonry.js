const grid = document.querySelector(".grid");
let msnry = new Masonry(grid, {
  // options
  // fitWidth: true,
  itemSelector: ".grid-item",
  columnWidth: ".grid-sizer",
  percentPosition: true,
  gutter: 5,
  stagger: 50,
  transitionDuration: "0.6s",
  horizontalOrder: true,
});

imagesLoaded(grid).on("progress", function () {
  msnry.layout();
});
