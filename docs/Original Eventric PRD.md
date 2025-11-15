# Here's how it works:

- On the first page, the user uploads a PDF file representing the rider. It's stored on S3 and triggers the Processing the Rider process.
- On the second page, the user chooses venues and dates that are part of the tour.
- Once a venue is selected it begins the rider/venue comparison process.
- On the third page, users can edit values the LLM has interpreted from the rider.  If the user makes a change, it retriggers the rider/venue comparison process for all of the venues in the tour.
- On the fourth page, users see an overview of the tour -- the venues selected, along with their ratings (if available).
- When the user clicks a venue they get more information about the ratings and a link to the detail page.
- On the fifth page (the detail page) the user can see the ratings that were produced by the rider/venue comparison process. Each individual entry shows the rating, as well as explanations and suggestions.  It also includes a link to a static "Open Discussions" web page.

# Processing the rider
The rider arrives as an unstructured PDF and must be processed into a JSON document format:

[[[[ JSON format here ]]]]

This translation is done via a call to a private LLM via bedrock.

# Rider/Venue Comparison process
Riders and venues are compared by the private LLM in the sense of "For each category, determine whether the venue satisfies the rider."  (These are compared in batches, as in "Backstage", "Lighting", etc.  These should run concurrently.)

Each comparison function returns a JSON file with all of the ratings, and all of the files for a venue are combined at the end.  For each parameter, it returns a red/yellow/green result, as well as the data for the rider and the venue, an explanation of why it made these choices, and a suggestion.

When all of the comparisons for the venue are complete, a summary rating, explanation, and suggestions are produced.


