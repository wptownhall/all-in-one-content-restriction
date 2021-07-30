"use strict";

(function ($) {
	var heymehedi = {

		formSubmission: function () {

			$(document).on('click', '#heymehedi-submit', function () {

				var restrictionWise = $('#restriction-wise').val();
				var posttype = $('#post-type').val();
				var roles = $('#roles').val();
				var textEditor = $('#heymehedi_custom_editor').val();
				var theTitle = $('#heymehedi_the_title').val();
				var itemIds = [];

				$('#heymehedi-selected_items_table_body tr').each(function (index, element) {
					var itemId = $(this).data('item-id');
					itemIds.push(itemId)
				});

				$.post(
					heymehedi_object.ajaxurl,
					{
						"action": "exlac_update_settings",
						"posttype": posttype,
						"itemIds": itemIds,
						"restrictionWise": restrictionWise,
						"roleNames": roles,
						"theContent": textEditor,
						"theTitle": theTitle,
					}, function (data) {
						console.log(data);
					}
				);

				return false;
			});


		},

		itemsQuery: function () {

			$(document).on('click', '#restriction-wise', function () {

				var restrictionWise = $(this).val();

				$.post(
					heymehedi_object.ajaxurl,
					{
						"action": "exlac_wise",
						"restrictionWise": restrictionWise,
					}, function (data) {
						$('#heymehedi-items_table_body').html(data);
					}
				);

				$.post(
					heymehedi_object.ajaxurl,
					{
						"action": "exlac_wise_selected",
						"restrictionWise": restrictionWise,
					}, function (data) {
						$('#heymehedi-selected_items_table_body').html(data);
					}
				);

			});

		},

		itemsOnLoad: function () {

			$.post(
				heymehedi_object.ajaxurl,
				{
					"action": "exlac_wise_on_load",
					"type": "not-selected",
				}, function (data) {
					$('#heymehedi-items_table_body').html(data);
				}
			);

			$.post(
				heymehedi_object.ajaxurl,
				{
					"action": "exlac_wise_selected",
					"type": "selected",
				}, function (data) {
					$('#heymehedi-selected_items_table_body').html(data);
				}
			);
		},

		searchItems: function () {

			$("#heymehedi-search_bar").on("keyup", function () {

				var value = $(this).val().toLowerCase();

				$("#heymehedi-items_table_body tr").filter(function () {
					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
				});

			});

			$("#heymehedi-search_bar_selected").on("keyup", function () {

				var value = $(this).val().toLowerCase();

				$("#heymehedi-selected_items_table_body tr").filter(function () {
					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
				});

			});

		},

		addToSelectedTable: function () {

			$(document).on('click', '#heymehedi-items_table_body .action', function () {

				var content = $(this).parent();

				$('#heymehedi-selected_items_table_body').prepend(content);
				$('#heymehedi-selected_items_table_body .dashicons-before').removeClass('dashicons-plus-alt2');
				$('#heymehedi-selected_items_table_body .dashicons-before').addClass('dashicons-minus');
			});

		},

		deleteFromSelectedTable: function () {

			$(document).on('click', '#heymehedi-selected_items_table_body .action', function () {

				var content = $(this).parent();

				$('#heymehedi-items_table_body').prepend(content);

				$('#heymehedi-items_table_body .dashicons-before').removeClass('dashicons-minus');
				$('#heymehedi-items_table_body .dashicons-before').addClass('dashicons-plus-alt2');
			});

		},

		select2js: function () {
			$("#roles").select2({
				placeholder: "Select roles",
				allowClear: true
			});
		},

		tooltip: function () {
			var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
			var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
				return new bootstrap.Tooltip(tooltipTriggerEl)
			})
		},

		setHeight: function () {
			let part1 = document.querySelector('.part1').clientHeight;
			let part2 = document.querySelector('.part2').clientHeight;
			let part3 = document.querySelector('.part3').clientHeight;
			let height = ( part1 + part2 + part3 ) - 110;
			$('#heymehedi-selected_items-wrapper').css('max-height', height + 'px' );
		},

	}


	$(document).ready(function () {
		heymehedi.formSubmission();
		heymehedi.itemsQuery();
		heymehedi.searchItems();
		heymehedi.addToSelectedTable();
		heymehedi.deleteFromSelectedTable();
		heymehedi.tooltip();
	});

	$(window).on('load', function () {
		heymehedi.select2js();
		heymehedi.setHeight();

	});

})(jQuery);


