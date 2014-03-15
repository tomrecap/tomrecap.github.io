var updateNavBarColors = function () {
  var scrolled = $(window).scrollTop();

  $("nav li a").removeClass("active-nav-block");
  if (scrolled >= 1126 && scrolled < 2467) {
    $("#bio-section-link").addClass("active-nav-block");
  } else if (scrolled >= 2467 && scrolled < 4038) {
    $("#recent-projects-section-link").addClass("active-nav-block");
  } else if (scrolled >= 4038 && scrolled < 6487) {
    $("#experience-section-link").addClass("active-nav-block");
  } else if (scrolled >= 6487 && scrolled < 7604) {
    $("#links-section-link").addClass("active-nav-block");
  } else if (scrolled >= 7604) {
    $("#contact-section-link").addClass("active-nav-block");
  };
};

$(document).ready(function () {
  $(window).scroll(function(event) {
   updateNavBarColors();
  });
});