# Prerequisites

- make sure you're using Node v16 w/ NPM 8
- paste the api URL into `.env` file, e.g. `REACT_APP_API_URL=https://...`(covers both dev and test envs, but please don't accidentally commit)

# How to

## Start dev server

(make sure env variable is set before starting the app)

1. `npm start`
2. Visit http://localhost:3000 if it doesn't automatically open

## Run tests

`npm test`

## ADR

### Data filtering

Looks like everyone is a list is a manager, so we don't need to filter the results by manager role.

### Debounce, lazy-loading, pagination

There are only 9 results returned from the api. Therefore pagination together with lazy-loading could be addressed once the api grows. Although it would be nice to add some debouncing so we don't filter on each keystroke immediately, and instead wait half a second or so after the last keystroke to trigger filtering.

### Data

#### Emails

It looks like email addresses will need to be mapped to user data after fetching, and looks like it can be done based on account id.

#### Avatars

There is an avatar key in the returned data, but all employees have it as `null`. It looks from the design that we can set the placeholder avatar to their initials in this case.

While it would be cool to do something like this for the initials: `attributes.name.match(/[A-Z]/g).join('')` (or another fancy expression), it will be safer to use charAt(0) for name/surname combo, especially due to non-ASCII letters.

Would be nice to assign a random color to avatar initials, since color is not coming from the API.

Will assign a random color during data mapping, so the colors don't change on rerender when typing search query if assigned in the component.

### Filtering

Since we need to search ignoring the space between first and last names, filtering could be done either by combining firstName + lastName and testing againts a regexp, or tested on the name field by ignoring the space.

### Dropdown list

Because we want the dropdown to represent a role closer to select than a list, listbox and option roles might be used.

Controling list height would ideally be done by calculating the height of one list item and cap the height accordingly, however initially we'll limit it by fixed element height until it can be refactored.
