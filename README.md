# Food app

## Main screen

### Overview
The One-day entries is the main screen. First screen to show when user opens the app. It will display food entries logged by the user.

<img src="assets/screenshots/main/normal.png" width=250>

On top of the screen, just beneath the device status bar is the header which the in the middle shows the date picked by the user dynamically. On the right side of the header is a button with a "+" icon that allow user to add a new food entry. 

Under the header is a calendar that user can click on a specific day to show food entries for that day. In the above example, the device contains entries of different dates and only "Salmon" and "White Rice" entry are shown as their date is 2024-11-22, the date user picked.

Between the calendar and the bottom tab is the where the entries sit on. A summary that sums up calories of all food entries on that day is shown. Each individual entry contains the description, date, and the calories. If the description is too long, it will be trimmed and appended with "..." to prevent overflow. The full description of the first entry is "Salmon too long abcdefghijk" and it's shown as "Salmon too long abcd...". The calories part is aligned to the calories summary to provide better viewing experience

The undermost component is the bottom tab, which will be the main component to navigate through different screens in this app.


### Picking date

<img src="assets/screenshots/main/date_prev.png" width=250>
<img src="assets/screenshots/main/date_month.png" width=250>
<img src="assets/screenshots/main/date_year.png" width=250>

There are different ways to navigates through dates. First one being clicking 1 single day out of 28-31 days shown for 1 month. To navigate to different months, click on the "<" icon to the previous month or ">" to the next month. To quickly jump to a month or a year, click the month or year shown in the calender and the available months or years will be shown for choosing. The selected day/month/year are in an accent color, in this case a gold/yellow color to stand out from the purple theme.

### No entry

<img src="assets/screenshots/main/fallback_241124.png" width=250>
<img src="assets/screenshots/main/fallback_241121.png" width=250>

If no entry was logged that day, there will be fallback text saying "No food entry for [DATE]". Of course the date of this fallback text is dynamic just like the header and corresponds to which day the user picks.

### Scrolling

<img src="assets/screenshots/main/scroll_top.png" width=250>
<img src="assets/screenshots/main/scroll_bottom.png" width=250>

If there are more entries than what can be shown one at a time, user can scroll up and down to see them.

### Bottom tab

<img src="assets/screenshots/main/icon_inactive.png" width=250>
<img src="assets/screenshots/main/icon_active.png" width=250>

Like in the calendar, the currently active screen will be in a accent color. Moreover, the icon for active and inactive is different. The inactive icon is a calender with empty design while the active icon is a calender with a block of one day to highlight to user "this is the screen for one day's entry, not one week or month".

## All entries

### Overview

The all entries screen is a simplified version of the main screen which shows all food entries of the user.

<img src="assets/screenshots/all/scroll_top.png" width=250>
<img src="assets/screenshots/all/scroll_bottom.png" width=250>

The header is similar but instead of a date and hard coded "All Entries" is shown. The rightside "+" button remains the same for adding a new food entry. The calendar is gone as it is not useful for all entries. Summary is also not a part of this screen. Showing calories summary for every entries logged to the device is not meaningful since we assume majority of users focus on how much they ate in one day and the TDEE (Total Daily Energy Expenditure) rather than how much they ate throughout a longer period.

Scrolling is available when the amount of entries exceed the screen.


### Bottom tab

<img src="assets/screenshots/all/icon_inactive.png" width=250>
<img src="assets/screenshots/all/icon_active.png" width=250>

Same design philosophy as the main screen. But this time the active icon is a calendar with grid design, highlighting it's all instead of just one

## Manage entries screen

### Overview

The manage entries screen is used for adding a new food entry and editing an existing entry. It can be opened in 2 ways: clicking on the "+" icon in the header; or tapping on an existing entry componment. 

<img src="assets/screenshots/manage/new.png" width=250>
<img src="assets/screenshots/manage/edit.png" width=250>

Main difference is when editing an existing entry, there is a delete button for deleting the entry from storage, which is not needed for adding a new entry. The title in header and the texts in buttons are also slightly different.

In add mode, some placeholders are shown on the screen, which also act as default values when user does not make any changes too them, like the text "New Food" for the description and number 100 for weight. Current date is the default value for the date field as we assume user is adding a new food entry for them that day The calendar shows the current day initially but it is absolutely selectable and works the same as the calendar in the main screen.

Fields like carbs, fat, protein and calories are not directly editable, as they depend on the selected food and the input weight.

### Dropdown

<img src="assets/screenshots/manage/dropdown.png" width=250>
<img src="assets/screenshots/manage/dropdown_search.png" width=250>


The dropdown list shows every food item the user can choose from. Since it can be long, the max height of the dropdown is limited and is scrollable. A search field with placeholder "Search..." is an text input for filtering items.

### Changing values

<img src="assets/screenshots/manage/selected.png" width=250>
<img src="assets/screenshots/manage/selected_edited.png" width=250>


When a food item is selected, the dropdown closes automatically and the description input gets the name of the food item. User can leave it as it is or edit the description.

The carbs, fat, protein and calories fields are calculated based on the value per 100g times the input weight (100 by default). User can make changes to the weight can all fields will be instantly calculated again and rounded to the nearest 1.

### Submitting

<img src="assets/screenshots/manage/closed.png" width=250>


Submit the new entry by clicking "Add" in add mdoe or "Update" in edit mode. The screen closes itself and new/updated entry is shown instantly without extra data fetching as the app is utilizing Context in React.

### Closing

<img src="assets/screenshots/manage/swipe_top.png" width=250>
<img src="assets/screenshots/manage/swipe_bottom.png" width=250>

Closing the screen can be the done in 2 ways: clicking on the "Cancel" button at the bottom; or swipe the screen down. The entry will not be added nor updated.
