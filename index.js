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

var types = [
  {
    alias: 'double',
    check: function (v, type, bsontype) { return bsontype === 'Double' }
  },
  {
    alias: 'string',
    check: function (v, type) { return type === 'string' }
  },
  {
    alias: 'array',
    check: function (v) { return Array.isArray(v) }
  },
  {
    alias: 'binData',
    check: function (v, type, bsontype) { return bsontype === 'Binary' }
  },
  {
    alias: 'objectId',
    check: function (v, type, bsontype) { return bsontype === 'ObjectID' }
  },
  {
    alias: 'bool',
    check: function (v, type) { return type === 'boolean' }
  },
  {
    alias: 'date',
    check: function (v) { return v instanceof Date }
  },
  {
    alias: 'regex',
    check: function (v, type, bsontype) { return bsontype === 'BSONRegExp' }
  },
  {
    alias: 'dbPointer',
    check: function (v, type, bsontype) { return bsontype === 'DBRef' }
  },
  // { alias: 'javascript', check: function (v) { } },
  {
    alias: 'symbol',
    check: function (v, type, bsontype) { return bsontype === 'Symbol' }
  },
  // { alias: 'javascriptWithScope', check: function (v) { return  } },
  {
    alias: 'int',
    check: function (v, type, bsontype) { return bsontype === 'Int32' }
  },
  {
    alias: 'timestamp',
    check: function (v, type, bsontype) { return bsontype === 'Timestamp' }
  },
  {
    alias: 'long',
    check: function (v, type, bsontype) { return bsontype === 'Long' }
  },
  // { alias: 'minKey', check: function (v) { return  } },
  // { alias: 'maxKey', check: function (v) { return  } },
  // NOTE: object should be at the end
  {
    alias: 'object',
    check: function (v, type) { return type === 'object' }
  },
]

// recognize bson types
function bsonTypeOfIs (value) {
  if (value === null) {
    return 'null'
  }

  var type = typeof value

  if (type === 'undefined') {
    return 'undefined'
  }

  var bsontype = value._bsontype

  var i
  for (i = 0; i < types.length; i++) {
    if (types[i].check(value, type, bsontype)) {
      return types[i].alias
    }
  }
  // Unrecognized type
  throw {
    message: 'This value has a type we do not recognize',
    value: value
  }
}

module.exports = bsonTypeOfIs
