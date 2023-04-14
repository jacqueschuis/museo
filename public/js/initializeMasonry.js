const grid = document.querySelector('.grid');
let msnry = new Masonry( grid, {
  // options
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true,
  gutter: 9,
  stagger:50,
  transitionDuration: '0.6s'
});

imagesLoaded(grid).on ('progress', function() {
  msnry.layout()
})
