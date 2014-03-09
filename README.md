# Flexibox

> Simple lightbox without any complicated stuff around it

## Why

You all know these huge jQuery lightbox plugins, right?  
Besides these 60kB (Fancybox) or even more, you also have to include jQuery in your site.

I found out that I don't need jQuery in my daily life - it would make my life easier but I really don't like overhead.

So I decided to write basic JS libraries not requiring any other libraries.  
Also, I want to learn advanced JS, so building this without jQuery was good for me (see "Feedback" below).

Flexibox is the second library in this series after I released [Flexisel](https://github.com/vis7mac/flexisel), a carousel library, two months ago.

## Features

- based on a set of lightboxable links and a "stage" attached to the body
- displays the stage using a custom class name, which will get attached when the lightbox is active (you will do something like `opacity: 0;` combined with transitions and some "position outside of canvas" stuff for that class)
- can be triggered manually by the user (clicking a link) or by the developer (`Flexibox.open()` and `Flexibox.close()` methods)
- can be closed by clicking on the "background" of the overlay, but this behaviour can be fully customized
- can exist multiple times on a page (different lightbox styles, yay!)

## Flexisel is:

- a simple lightbox framework
- 912 bytes minified and gzipped (!)
- totally flexible, as it doesn't require any other libraries

## Flexisel is *not*:

- packed with any CSS or graphics, so it can be highly configured (there is example CSS, but it isn't required!)
- capable of displaying galleries or anything else than images
- usable out-of-the-box™
- working in stone-age browsers (requires `document.querySelector`)

## Usage

→ `example.html`

## Feedback

I'm truly not a JS professional - but I want to become one.

I tried to comment everything in the Flexibox code, so if you want to support me and are good at JS, I would be really happy if you would give me [feedback on my code](https://twitter.com/lukasbestle).  
**Thanks!**