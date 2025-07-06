(function () {
  var a =
    "6SgwTpDPViUs2LElzZ@u_Xv8mx4.c9e3AIBORQ1Ntq05HdnCjMarkKG+hWoYFJ7b-yf";
  var b = a.split("").sort().join("");
  var c = "roMYFaqGgrJodgTLCKqMkg5+K";
  var d = "";
  for (var e = 0; e < c.length; e++) {
    d += b.charAt(a.indexOf(c.charAt(e)));
  }
  const emailContainer = document.getElementById("e291670303");
  if (emailContainer) {
    emailContainer.innerHTML =
      '<a href="mailto:' +
      d +
      '" aria-label="Email" class="svg-icon-email" title="Let\'s chat via email ✉️"><img src="./images/email.svg" alt="Email" /></a>';
  }
})();
