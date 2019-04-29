define({ "api": [
  {
    "type": "get",
    "url": "/api/users/user/email/:email",
    "title": "Request User information by email.",
    "name": "GetUserByEmail",
    "group": "User",
    "version": "1.0.0",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The User's email.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>User unique identifier.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\": \"5cac9e0683699c171c69a086\",\n\t\"name\": \"Jhon Doe\",\n\t\"email\": \"jhondoe@email.com\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The email of the user was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\t\"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/users/login",
    "title": "Loggin the user",
    "name": "LogginUser",
    "group": "User",
    "version": "1.0.0",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The User's email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The User's password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The JWT Token used to authenticate.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User unique identifier.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\tHTTP/1.1 200 OK\n\t{\n \t\t\"token\": \"jsonWebToken\",\n\t\t\"name\": \"Jhon Doe\",\n\t\t\"id\": \"5cac9e0683699c171c69a086\",\n\t\t\"email\": \"jhondoe@email.com\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PasswordIncorrect",
            "description": "<p>If the password sended was incrrect.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmailIncorrect",
            "description": "<p>If the email sended was incorrect.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmailAndPasswordNotSended",
            "description": "<p>If the email and the password was not sended.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"error\": \"PasswordIncorrect\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1  401 Unauthorized\n{\n\t\"error\": \"EmailIncorrect\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"error\": \"EmailAndPasswordNotSended\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/users/",
    "title": "Create a new User.",
    "name": "PostUser",
    "group": "User",
    "version": "1.0.0",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The User's name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The User's email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The User's password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>User unique identifier.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n\t\"_id\": \"5cac9e0683699c171c69a086\",\n\t\"name\": \"Jhon Doe\",\n\t\"email\": \"jhondoe@email.com\",\n\t\"password\": \"encrypted-password\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FieldEmpty",
            "description": "<p>This error is sended when one or more field was not sended.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n[\n\t{\n\t\t\"location\": \"params\",\n\t\t\"param\": \"name\",\n\t\t\"msg\": \"The field name cannot be empty.\"\n\t}\n]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/api/users/update",
    "title": "Update the user.",
    "name": "PutUser",
    "group": "User",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The User's name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The User's email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "old_password",
            "description": "<p>The User's current password (if password change).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "new_password",
            "description": "<p>The new password (if password change).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirm_password",
            "description": "<p>The new password confirmation (if password change).</p>"
          },
          {
            "group": "Parameter",
            "type": "JsonToken",
            "optional": false,
            "field": "token",
            "description": "<p>The JWT Token, should be sended on the header.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>User unique identifier.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>New name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>New email of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>New password of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 202 Accepted\n{\n\t\"_id\": \"5cac9e0683699c171c69a086\",\n\t\"name\": \"Jhon Doe\",\n\t\"email\": \"jhondoe@email.com\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PasswordsDontMatch",
            "description": "<p>If the new password and the confirm password are not equal.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CurrentPasswordInvalid",
            "description": "<p>If the current password is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"error\": \"PasswordsDontMatch\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"error\": \"CurrentPasswordInvalid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  }
] });
