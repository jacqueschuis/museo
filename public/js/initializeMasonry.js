const grid = document.querySelector('.grid');
let msnry;

imagesLoaded( grid, () => {
  msnry= new Masonry( grid, {
    // options
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    gutter: 9,
  });
})
