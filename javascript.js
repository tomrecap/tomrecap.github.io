var updateNavBarColors = function () {
  var scrolled = $(window).scrollTop();

  $("nav li a").removeClass("active-nav-block");
  if (scrolled >= 1126-450 && scrolled < 2467-450) {
    $("#bio-section-link").addClass("active-nav-block");
  } else if (scrolled >= 2467-450 && scrolled < 4038-450) {
    $("#recent-projects-section-link").addClass("active-nav-block");
  } else if (scrolled >= 4038-450 && scrolled < 6487-450) {
    $("#experience-section-link").addClass("active-nav-block");
  } else if (scrolled >= 6487-450 && scrolled < 7604-450) {
    $("#links-section-link").addClass("active-nav-block");
  } else if (scrolled >= 7604-450) {
    $("#contact-section-link").addClass("active-nav-block");
  };
};

$(document).ready(function () {
  $(window).scroll(function(event) {
   updateNavBarColors();
  });
});