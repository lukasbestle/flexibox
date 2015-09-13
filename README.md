# Flexibox

> Simple lightbox without any complicated stuff around it

## Why

You all know these huge jQuery lightbox plugins, right?  
Besides these 60kB (Fancybox) or even more, you also have to include jQuery on your site.

I found out that I don't need jQuery in my daily life - it would make my life a bit easier but I really don't like overhead.
Don't get me wrong: Using jQuery can make sense, but not for sites that otherwise don't use much JavaScript.

So I decided to write basic JS libraries without any dependencies.

Flexibox is the second library in this series after I released [Flexisel](https://git.lukasbestle.com/flexijs/flexisel), a carousel library, two months ago.

## Features

- based on a set of lightbox-able links and a "stage" attached to the body
- displays the stage using a custom class name, which will get attached when the lightbox is active (you will do something like `opacity: 0;` combined with transitions and some "position outside of canvas" stuff for that class)
- can be triggered manually by the user (by clicking a link) or by the developer (`Flexibox.open()` and `Flexibox.close()` methods)
- can be closed by clicking on the "background" of the overlay, but this behaviour can be fully customized
- can exist multiple times on a page (different lightbox styles and behavior, yay!)

## Flexibox is:

- a simple lightbox framework
- < 1 KB minified and gzipped (!) with no dependencies
- totally flexible and customizable

## Flexibox is *not*:

- packed with any CSS or graphics, so it can be highly configured (there is example CSS, but it isn't required!)
- capable of displaying galleries or anything else than images
- usable out-of-the-box™
- usable in stone-age browsers (requires `document.querySelector`)

## Usage

→ `example.html`

## Author

- Lukas Bestle <mail@lukasbestle.com>

## License

This project was published under the terms of the MIT license. You can find a copy [over at the repository](https://git.lukasbestle.com/flexijs/flexibox/blob/master/LICENSE.md).
