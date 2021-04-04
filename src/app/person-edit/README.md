# PersonEdit use case

Change a person's type information

## Input Data

- ID
- Name
- Saviors
- Animals

## Output Data

- The changed person

## Primary Course

1. Validate data
1. Change data in the DB
1. Return the changed person

## Alternative Courses

- If the input is invalid, return what was wrong
- If the person does not exist, return error

## Exception Cases

- Could not write to DB
