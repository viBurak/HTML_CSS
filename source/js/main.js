$(document).ready(function() {
	$(".header").sticky({ topSpacing: 0 });
	var $window = $(window);

	function checkWidth() {
		var windowsize = $window.width();
		if (windowsize <= 768) {
			return true;
		} else {
			return false;
		}
	}

	function cardPosition() {
		var windowsize = $window.width();
		if (windowsize <= 767) {
			$(".footer-card").html($('.payment-list'));
		} else {
			$(".payment").html($('.payment-list'));
		}
	}

	$(window).resize(function() {
		cardPosition();
	});

	cardPosition();

	$(".nav-link").click(function(e) {
		if (
			checkWidth() &&
			!$(this)
				.parent(".nav-item")
				.hasClass("active")
		) {
			e.preventDefault();
			$(".nav-item").addClass("hidden");
			$(this)
				.parent(".nav-item")
				.removeClass("hidden");
			$(this)
				.parent(".nav-item")
				.addClass("active");
			$(this)
				.siblings(".nav-submenu")
				.find(".nav-submenu-list")
				.each(function(index) {
					$(this)
						.find(".nav-submenu-item")
						.first()
						.addClass("active");
				});
			$(".nav").addClass("active");
		}
	});

	$(".back_to").click(function(e) {
		if (checkWidth() && !$(this).hasClass("lvl_2")) {
			e.preventDefault();
			$(".nav-item").removeClass("hidden");
			$(this)
				.parent(".nav-item")
				.removeClass("active");
			$(".nav").removeClass("active");
		}
	});

	$(".nav-submenu-list").click(function(e) {
		if (checkWidth()) {
			e.preventDefault();
			$(".nav-submenu-list").addClass("hidden");
			$(".nav-link").addClass("hidden");
			var parent = $(".nav-item.active .nav-link").html();
			var thisElement = $(".nav-submenu-item.active .nav-submenu-link")
				.first()
				.html();
			$(".nav-submenu-item.active .nav-submenu-link")
				.first()
				.html(
					'<p class="nav-submenu-parent">' + parent + "/</p>" + thisElement
				);
			$(this).removeClass("hidden");
			$(this).addClass("active");
			$(".back_to").addClass("lvl_2");
		}
	});

	$(document).on("click", ".back_to.lvl_2", function(e) {
		if (checkWidth()) {
			e.preventDefault();
			$(".nav-submenu-list").removeClass("hidden");
			$(".nav-submenu-list").removeClass("active");
			$(".nav-link").removeClass("hidden");
			$(".nav-link").removeClass("active");
			$(this)
				.parent()
				.addClass("active");
			$(this).removeClass("lvl_2");
			$(".nav-submenu-parent").remove();
		}
	});

	if (checkWidth()) {
		if (parseInt($(".minicart-count").html()) == 0) {
			$(".minicart").addClass("ziro");
		}
	}

	$(".newsletter-submit").click(function(e) {
		if (!$(".newsletter-form").hasClass("active")) {
			e.preventDefault();
		} else {
			if (
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
					$(".js-newsletter-input").val()
				)
			) {
				e.preventDefault();
				$(".newsletter-form").removeClass("error");
				$(".newsletter-form").addClass("success");
			} else {
				$(".newsletter-form").addClass("error");
				e.preventDefault();
			}
		}
	});

	$(".js-newsletter-input").keyup(function(e) {
		if ($(this).val().length < 0) {
			$(".newsletter-form").removeClass("filled");
			$(".newsletter-form").removeClass("active");
		} else {
			$(".newsletter-form").addClass("filled");
		}
	});
	$(".newsletter-label").click(function(e) {
		console.log($(".js-newsletter-polices-checkbox").prop("checked"));
		if (
			!$(".js-newsletter-polices-checkbox").prop("checked") &&
			$(".newsletter-form").hasClass("filled")
		) {
			$(".newsletter-form").addClass("active");
		} else {
			$(".newsletter-form").removeClass("active");
		}
	});
});
