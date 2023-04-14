const grid = document.querySelector('.grid');
let msnry = new Masonry( grid, {
  // options
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true,
  gutter: 9,
  resize: true
});

imagesLoaded(grid).on ('progress', function() {
  msnry.layout()
})
