Debouncing:

typing slow = 200ms
typing fast = 30ms

performance:
 - iphone pro max = 14 letters * 1000 = 14000
 - with Debouncing = 3 API calls * 1000 = 3000

Debouncing with 200ms
 - if Difference between 2 key Strokes are <200ms - Decline API call.
 - if it is >200ms Make an API Call