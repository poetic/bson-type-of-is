// BSON types
// Type                    Number       Alias
// Double                  1            “double”
// String                  2            “string”
// Object                  3            “object”
// Array                   4            “array”
// BinaryData              5            “binData”
// Undefined               6            “undefined”
// ObjectId                7            “objectId”
// Boolean                 8            “bool”
// Date                    9            “date”
// Null                    10           “null”
// RegularExpression       11           “regex”
// DBPointer               12           “dbPointer”
// JavaScript              13           “javascript”
// Symbol                  14           “symbol”
// JavaScript(withScope)   15           “javascriptWithScope”
// 32-bitInteger           16           “int”
// Timestamp               17           “timestamp”
// 64-bitInteger           18           “long”
// MinKey                  -1           “minKey”
// MaxKey                  127          “maxKey”

var TYPES = [
  "undefined",
  "null",
  "double",
  "string",
  "array",
  "binData",
  "objectId",
  "bool",
  "date",
  "regex",
  "dbPointer",
  // "javascript",
  "symbol",
  // "javascriptWithScope",
  "int",
  "timestamp",
  "long",
  "object",
  // "minKey",
  // "maxKey",
]

var types = [
  {
    alias: 'undefined',
    check: function (v) { return typeof v === 'undefined' }
  },
  {
    alias: 'null',
    check: function (v) { return v === null }
  },
  {
    alias: 'double',
    check: function (v) { return v && v._bsontype === 'Double' }
  },
  {
    alias: 'string',
    check: function (v) { return typeof v === 'string' }
  },
  {
    alias: 'array',
    check: function (v) { return Array.isArray(v) }
  },
  {
    alias: 'binData',
    check: function (v) { return v && v._bsontype === 'Binary' }
  },
  {
    alias: 'objectId',
    check: function (v) { return v && v._bsontype === 'ObjectID' }
  },
  {
    alias: 'bool',
    check: function (v) { return typeof v === 'boolean' }
  },
  {
    alias: 'date',
    check: function (v) { return v instanceof Date }
  },
  {
    alias: 'regex',
    check: function (v) { return v && v._bsontype === 'BSONRegExp' }
  },
  {
    alias: 'dbPointer',
    check: function (v) { return v && v._bsontype === 'DBRef' }
  },
  // { alias: 'javascript', check: function (v) { } },
  {
    alias: 'symbol',
    check: function (v) { return v && v._bsontype === 'Symbol' }
  },
  // { alias: 'javascriptWithScope', check: function (v) { return  } },
  {
    alias: 'int',
    check: function (v) { return v && v._bsontype === 'Int32' }
  },
  {
    alias: 'timestamp',
    check: function (v) { return v && v._bsontype === 'Timestamp' }
  },
  {
    alias: 'long',
    check: function (v) { return v && v._bsontype === 'Long' }
  },
  // { alias: 'minKey', check: function (v) { return  } },
  // { alias: 'maxKey', check: function (v) { return  } },
  // NOTE: object should be at the end
  {
    alias: 'object',
    check: function (v) { return typeof v === 'object' }
  },
]

// recognize bson types
function bsonTypeOfIs (value) {
  var i
  for (i = 0; i < types.length; i++) {
    if (types[i].check(value)) {
      return types[i].alias
    }
  }
  // Unrecognized type
  throw {
    message: 'This value has a type we do not recognize',
    value: value
  }
}

function testBsonType (type, value) {
  if (!types[type]) {
    throw {
      message: 'This type is not a bson type alias',
      value: type
    }
  }

  return types[type].check(value)
}

bsonTypeOfIs.testBsonType = testBsonType
bsonTypeOfIs.TYPES = TYPES

module.exports = bsonTypeOfIs
