
"use client";

export default function CalendarIframe() {
    return (
        <iframe
            src="https://calendar.google.com/calendar/embed?src=b2818272096757279101c7edfb7f75cec60d5a6cde1b5bc51a2cb1cdf41d826b%40group.calendar.google.com&ctz=Europe%2FBerlin"
            className="absolute top-0 left-0 w-full h-full dark:invert dark:hue-rotate-180 transition-all duration-300"
            style={{border: 0}}
            width="800"
            height="600"
            frameBorder="0"
            scrolling="no">
        </iframe>
    )
}
