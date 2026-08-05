/* ==========================================================================
   Various functions that we want to use within the template
   ========================================================================== */

/*jslint es6 */
'use strict';

// Detect OS/browser preference
const browserPref = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Determine the computed theme, which can be "dark" or "light".
function determineComputedTheme() {
  // Determine the expected state of the theme toggle, which can be "dark", "light", or default "system"
  let themeSetting = localStorage.getItem("theme");
  themeSetting = (themeSetting != "dark" && themeSetting != "light" && themeSetting != "system") ? "system" : themeSetting;

  // Return the setting if set, or use the browser preference
  if (themeSetting != "system") {
    return themeSetting;
  }
  return browserPref ? "dark" : "light";
}

// Set the theme on page load or when explicitly called
function setTheme(theme) {
  const use_theme = theme ||
    localStorage.getItem("theme") ||
    $("html").attr("data-theme") ||
    browserPref;

  if (use_theme === "dark") {
    $("html").attr("data-theme", "dark");
    $("#theme-icon").removeClass("fa-sun").addClass("fa-moon");
  } else if (use_theme === "light") {
    $("html").removeAttr("data-theme");
    $("#theme-icon").removeClass("fa-moon").addClass("fa-sun");
  }
}

// Toggle the theme manually
function toggleTheme() {
  const current_theme = $("html").attr("data-theme");
  const new_theme = current_theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", new_theme);
  setTheme(new_theme);
}

/* ==========================================================================
   Actions that should occur when the page has been fully loaded
   ========================================================================== */

$(document).ready(function () {
  // SCSS SETTINGS - These should be the same as the settings in the relevant files
  const scssLarge = 925;          // pixels, from /_sass/_themes.scss

  // If the user hasn't chosen a theme, follow the OS preference
  setTheme(determineComputedTheme());
  window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener("change", (e) => {
          if (!localStorage.getItem("theme")) {
            setTheme(e.matches ? "dark" : "light");
          }
        });

  // Enable the theme toggle
  $('#theme-toggle').on('click', toggleTheme);

  // Enable the sticky footer
  var bumpIt = function () {
    $("body").css("padding-bottom", "0");
    $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
  };
  bumpIt();

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function () {
    const isExpanded = $(this).attr("aria-expanded") === "true";
    $(".author__urls").fadeToggle("fast");
    $(this).attr("aria-expanded", String(!isExpanded));
  });

  // Recalculate the footer and restore the desktop follow menu after resize.
  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      bumpIt();
      if ($(window).width() >= scssLarge) {
        $(".author__urls").css("display", "block");
        $(".author__urls-wrapper button").attr("aria-expanded", "true");
      } else {
        $(".author__urls").css("display", "");
        $(".author__urls-wrapper button").attr("aria-expanded", "false");
      }
    }, 100);
  });
});
