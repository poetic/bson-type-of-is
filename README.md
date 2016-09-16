# bson-type-of-is

## Description
This package is compatible with https://github.com/mongodb/js-bson/

## BSON types
https://docs.mongodb.com/manual/reference/bson-types/

## Usage
```
import bson from 'bson'
import bsonTypeOfIs from 'bson-type-of-is'

const type = bsonTypeOfIs(bson.BSONPure.Long.fromNumber(10))
// type is 'long'
```
