How to setup app?

```
1.npm init
2.npm install electron --save-dev
```

TODO:

- CORE

1. ~~Save categories~~
2. ~~Save Filters for categories~~
3. ~~Import CSV and show it on table~~
4. ~~Filter and calculate imported data and show~~

- EXTRA

1. ~~Make adding filters more user friendly~~
2. All saved data should be reviewable (month or year from now)
3. Possible to pick and choose columns from csv (only if working with other csv files)
4. Possible to filter by date (combining previous files together?)
5. Images/Icons for some categories
6. Filter and Categories are changeable and removable
7. Maybe combine budgetCards, adding filters and showing all spendings in one card ???

BUGS:

1. when new file is selected and adding categories (doesn't effect addign sub category), then it doesnt open modal anymore and budget cards are messed up
2. Categories with no filter show invalid spending and percentage
3. Possible to add empty filter ("")
