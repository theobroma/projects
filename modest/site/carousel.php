<!-- Carousel -->
<div id="homeCarousel" class="carousel slide">
  <!-- Menu -->
  <ol class="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>
    <li data-target="#myCarousel" data-slide-to="2"></li>
    <li data-target="#myCarousel" data-slide-to="3" class="active"></li>
  </ol>
    
  <!-- Items -->
  <div class="carousel-inner">
      
      <!-- Item 1 -->
    <div class="item active">
        <img src="http://lorempixel.com/1900/660/abstract/1"/>
      <div class="container">
        <div class="carousel-caption">
          <h1>Bootstrap 3 Carousel Layout</h1>
          <p>This is an example layout with carousel that uses the Bootstrap 3 styles.</p>
          <p><a class="btn btn-lg btn-primary" href="http://getbootstrap.com">Learn More</a>
        </p></div>
      </div>
    </div>
      
      <!-- Item 2 -->
    <div class="item">
        <img src="http://lorempixel.com/1900/660/abstract/2"/>
      <div class="container">
        <div class="carousel-caption">
          <h1>Changes to the Grid</h1>
          <p>Bootstrap 3 still features a 12-column grid, but many of the CSS class names have completely changed.</p>
          <p><a class="btn btn-large btn-primary" href="#">Learn more</a></p>
        </div>
      </div>
    </div>
      
      <!-- Item 3 -->
    <div class="item">
        <img src="http://lorempixel.com/1900/660/abstract/3" />
      <div class="container">
        <div class="carousel-caption">
          <h1>Percentage-based sizing</h1>
          <p>With "mobile-first" there is now only one percentage-based grid.</p>
          <p><a class="btn btn-large btn-primary" href="#">Browse gallery</a></p>
        </div>
      </div>
    </div>
    <!-- Item 4 -->
    <div class="item">
        <img src="images/content/slide1.jpg"/>
      <div class="container">
        <div class="carousel-caption">
          <h1>Percentage-based sizing</h1>
          <p>With "mobile-first" there is now only one percentage-based grid.</p>
          <p><a class="btn btn-large btn-primary" href="#">Browse gallery</a></p>
        </div>
      </div>
    </div>
  </div>
  <!-- Controls -->
  <a class="left carousel-control" href="#myCarousel" data-slide="prev">
    <span class="icon-prev"></span>
  </a>
  <a class="right carousel-control" href="#myCarousel" data-slide="next">
    <span class="icon-next"></span>
  </a>  
  <div id="carouselButtons">
      <button id="playButton" type="button" class="btn btn-default btn-xs">
          <span class="glyphicon glyphicon-play"></span>
       </button>
      <button id="pauseButton" type="button" class="btn btn-default btn-xs">
          <span class="glyphicon glyphicon-pause"></span>
      </button>
  </div>
</div>