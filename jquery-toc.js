/**
 * jQuery Table of Contents
 * @author Chris Bracco
 * @url http://github.com/cbracco/jquery-toc
 */

(function ( $ ) {
	var methods = {
		init : function ( options ) {
			// Define some default settings that can be overridden
			settings = $.extend({
				// Only look for headings inside this element
				scope: "body",
				// Build the table of contents from these headings
				heading_tags: ["h1", "h2", "h3", "h4", "h5", "h6"],
				// Should the table of contents be ordered or unordered?
				list_type: "ul",
				// Exclude elements with the `.toc-exclude` class
				exclude: [".toc-exclude"]
			}, options);

			// Set variables
			var el           = $(this), // Cache this
			    id           = 1,       // Doubles as a counter
			    depth        = null,    // Keeps track of heading depth
			    text         = "",      // Contains the table of contents
			    all_headings = settings.heading_tags.join(", "),
			    exclusions   = settings.exclude.join(", "),
			    $headings    = $(settings.scope).find(all_headings).not(exclusions);

			// Find all of the qualified heading tags
			$headings.each(function() {

				// Set variables for this heading, its tag, and its level
				var heading       = $(this),
				    heading_tag   = this.tagName,
				    heading_level = heading_tag.substr(1, 1);

				/**
				 * Check the current depth and heading level first
				 */

				// If the current depth is less than the heading level,
				// begin a new list
				if (depth < heading_level) {
					text += "<" + settings.list_type + ">";
				}
				// If the current depth is greater than the heading
				// level, close the list that was previously opened
				else if (depth > heading_level) {
					text += "</" + settings.list_type + "></li>";
				}
				// If the current depth equals the heading level,
				// close the list item
				else if (depth == heading_level) {
					text += "</li>";
				}

				// Set the current depth equal to this heading level
				depth = heading_level;

				// Build the text for this item in the table of contents
				// and leave the list item open
				text += '<li><a href="#section' + id + '">' + heading.text() + '</a>';

				// Add section id and `.section-heading` class to this heading tag
				heading.attr('id', 'section' + id).addClass('section-heading');

				// Increment the section id
				id++;
			}); // end each()

			// Append the list to the table of contents
			el.append($(text));

			// Return the table of contents
			return el;
		} // end init
	}; // end methods

	$.fn.toc = function (method) {
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === "object" || undefined == method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error("Method " +  method + " does not exist on jQuery.toc");
		}
	}
}) (jQuery);
