# Streaming Widgets

This is a collection of widgets and CSS overrides that can be used in OBS or XSplit to create or alter your overlay.

## Text widgets

`overlay.js` provides the framework for displaying simple text widgets from a source on a web server.
For example, to create a pair of widgets that display the latest follower and the currently playing song from
files named `most_recent_follower.txt` and `now-playing.txt` respectively:

```javascript
var barElem = document.getElementById('statusbar');
var lastFollow = new Widget('most_recent_follower.txt', 'follower', barElem);

var nowPlaying = new Widget('now-playing.txt', 'now-playing', barElem);

lastFollow.startUpdates();
nowPlaying.startUpdates();
```

The widgets will not display until you call `startUpdates()` on them.

You may specify text to appear before and after the dynamic text by setting `.prefix` and `.suffix` on the widget object.
For example, to display a "play" symbol before the song name above:

```javascript
var nowPlaying = new Widget('now-playing.txt', 'now-playing', barElem);
nowPlaying.prefix = "\u25BA ";
```

Using the styles included here, the above looks like this:

![Text widgets preview](http://i.imgur.com/Ry5JCHF.png)

## Discord voice state

This style strips off avatars and stylizes the background shape.

![Discord voice state preview](http://i.imgur.com/2I7ZgUq.png)

## TwitchAlerts

This style stylizes the background.

Important: Using this style as-is will make any user-entered messages invisible.

![TwitchAlerts preview](http://i.imgur.com/NqIlO5m.png)
