document.addEventListener('DOMContentLoaded', function(){

	// SIDEBAR NAVIGATION
	var elems = document.querySelectorAll('.sidenav');
	M.Sidenav.init(elems);
	loadNav();

	function loadNav()
	{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4){
				if(this.status != 200) return;

				// Muat daftar tautan menu
				document.querySelectorAll(".topnav, .sidenav")
				.forEach(function(elm){
					elm.innerHTML = xhttp.responseText;
				});
			}
		};
		xhttp.open("GET", 'navigasi.html', true);
		xhttp.send();
	}

});
