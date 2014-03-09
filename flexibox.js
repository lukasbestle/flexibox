/**
 * Flexibox
 * Simple lightbox without any complicated stuff around it
 * 
 * @version   0.9.1 (09.03.2014)
 * @author    Lukas Bestle <lukas@lu-x.me>
 * @copyright Lukas Bestle
 * @link      https://github.com/vis7mac/flexibox
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0
 * 
 * @param  object links   A list of all links the user can trigger to open the lightbox
 * @param  object options Object with configuration options overwriting the default ones
 */
var Flexibox = function(links, options) {
	'use strict';
	
	var self = this,
	    attrName,
	    stageObj,
	    stageBackup,
	    addClass,
	    removeClass,
	    addEvent;
	
	// Expose default options
	this.options = {
		// Selectors
		stage:        '.lightboxstage', // Stage in body
		title:        'span',           // Title box in stage
		image:        'img',            // Image in stage
		
		// Class names
		activeClass:  'active',         // Class attached to the stage while changing its content
		
		// Callbacks
		openCallback:  null,            // Callback called with image, title and stage when opening the lightbox;
		                                // can return false to prevent opening the lightbox
		closeCallback: null,            // Callback called with the stage when closing the lightbox;
		                                // can return false to prevent closing the lightbox
		
		// Other options
		scrolling:    true,             // Disable scrolling on body while open?
		debug:        false             // Debug mode (print to console each time the lightbox is opened or closed)
	};
	
	// Merge with custom options
	if(typeof options === 'object') {
		for(attrName in options) {
			if(options.hasOwnProperty(attrName)) {
				this.options[attrName] = options[attrName];
			}
		}
	}
	
	// Get required stuff from the DOM
	stageObj = document.querySelector(this.options.stage);
	links    = Array.prototype.slice.call(links);
	
	// Backup the current stage
	stageBackup = stageObj.innerHTML;
	
	// Expose status stuff
	window.flexibox = {};
	this.active = window.flexibox.active = false; // Is the lightbox currently active?
	this.data   = {                               // Information about the currently active item
		'image': null,
		'title': null
	};
	
	/**
	 * Opens a lightbox with a specified image and title
	 * 
	 * @param  string  image The image URL to load
	 * @param  string  title A title to display in the lightbox
	 * @return boolean       Did it work?
	 */
	this.open = function(image, title) {
		var imageObj, titleObj;
		
		// Don't open if already open
		if(window.flexibox.active) {
			if(this.options.debug) {
				console.log('[Flexibox] Lightbox is already open!');
			}
			return false;
		}
		
		// Ask the callback
		if(this.options.openCallback && !this.options.openCallback(image, title, stageObj)) {
			if(this.options.debug) {
				console.log('[Flexibox] Callback aborted opening the lightbox with image "' + image + '" and title "' + title + '".');
			}
			return false;
		}
		
		// Restore the stage backup
		stageObj.innerHTML = stageBackup;
		
		// Set status
		this.active = window.flexibox.active = true;
		this.data   = {
			'image': image,
			'title': title
		};
		
		// Set image
		imageObj = stageObj.querySelector(this.options.image);
		imageObj.src   = image;
		imageObj.alt   = title;
		imageObj.title = title;
		
		// Set title
		titleObj = stageObj.querySelector(this.options.title);
		titleObj.innerHTML = title;
		
		// Disable scrolling on body
		if(this.options.scrolling) {
			document.body.style.overflow = 'hidden';
		}
		
		// Show the stage
		addClass(stageObj, this.options.activeClass);
		
		if(this.options.debug) {
			console.log('[Flexibox] Opened lightbox with image "' + image + '" and title "' + title + '".');
		}
		return true;
	};
	
	/**
	 * Closes the lightbox
	 * 
	 * @param  object  event Optional: The click event which triggered closing the lightbox to pass to the callback
	 * @return boolean       Did it work?
	 */
	this.close = function(event) {
		// Don't close if not open
		if(!window.flexibox.active) {
			if(this.options.debug) {
				console.log('[Flexibox] Lightbox is not open!');
			}
			return false;
		}
		
		// Ask the callback
		if(this.options.closeCallback && !this.options.closeCallback(stageObj, event)) {
			if(this.options.debug) {
				console.log('[Flexibox] Callback aborted closing the lightbox.');
			}
			return false;
		}
		
		// Set status
		this.active = window.flexibox.active = false;
		this.data   = {
			'image': null,
			'title': null
		};
		
		// Enable scrolling on body
		if(this.options.scrolling) {
			document.body.style.overflow = null;
		}
		
		// Hide the stage
		removeClass(stageObj, this.options.activeClass);
		
		if(this.options.debug) {
			console.log('[Flexibox] Closed lightbox.');
		}
		return true;
	};
	
	/**
	 * Helper functions
	 */
	addClass = function(element, className) {
		element.className += ((element.className)? ' ' : '') + className;
	};

	removeClass = function(element, className) {
		element.className = element.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
	};
	
	addEvent = function(obj, type, fn) {
		if(obj.addEventListener) {
			obj.addEventListener(type, fn, false);
		} else if (obj.attachEvent) {
			obj['e' + type + fn] = fn;
			obj[type + fn]       = function() {
				obj['e' + type + fn](window.event);
			};
			
			obj.attachEvent('on' + type, obj[type + fn]);
		}
	};
	
	/*
	 * Click handlers
	 */
	addEvent(stageObj, 'click', function(event) {
		// Check if it is our responsibility
		if(!self.active) {
			// No, skip to next event
			return false;
		}
		
		// Check if the background has been clicked
		// If there is a callback, let it do that check
		if(!self.options.closeCallback && event.target !== stageObj) {
			return;
		}
		
		self.close(event);
	});
	
	links.forEach(function(link) {
		// Add a click handler for this link
		addEvent(link, 'click', function(event) {
			self.open(link.href, link.title);
			
			// Prevent redirection
			event.preventDefault();
		});
	});
};
