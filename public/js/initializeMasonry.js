var grid = document.querySelector('.grid');
var msnry = new Masonry( grid, {
  // options
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true,
  gutter: 9,
  stagger: 30
});

imagesLoaded( grid ).on( 'progress', () => {
    msnry.layout();
})
