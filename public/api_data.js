define({ "api": [
  {
    "type": "delete",
    "url": "/api/briefings",
    "title": "Delete the briefing data.",
    "name": "DeleteBriefing",
    "group": "Briefings",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>The briefing unique id.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FieldEmpty",
            "description": "<p>This error is sended when one or more mandatory field was not sended. This return a array with the errors.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The JWT token passed is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n[\n\t{\n\t\t\"location\": \"params\",\n\t\t\"param\": \"_id\",\n\t\t\"msg\": \"You need to pass the briefing id.\"\n\t}\n]",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\nUnauthorized",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "routes/briefings.js",
    "groupTitle": "Briefings"
  },
  {
    "type": "get",
    "url": "/api/briefings/briefing/:id",
    "title": "Request sigle briefing information",
    "name": "GetBriefing",
    "group": "Briefings",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "budget",
            "description": "<p>The information related with the project budget.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "time_goal",
            "description": "<p>The schedule of the project.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "cost",
            "description": "<p>The cost of the project.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "features",
            "description": "<p>A list of all the features wished in the project.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>The briefing unique id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cl_name",
            "description": "<p>The name of the client.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cl_email",
            "description": "<p>The email of the client.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cl_phone",
            "description": "<p>The phone contact of the client.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "examples",
            "description": "<p>Some similar projects.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "social_media",
            "description": "<p>If the project have any social media that can be looked over.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "num_pages",
            "description": "<p>The number of pages that the project have.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "has_visual",
            "description": "<p>Indicate if the project already have a design.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "has_logo",
            "description": "<p>Indicate if the project already have a logo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "has_current",
            "description": "<p>Indicate if the project already have a current version that should be modified.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Some description of the project.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "outline",
            "description": "<p>The outline of the project.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "objective",
            "description": "<p>The objecive of the project.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdBy",
            "description": "<p>The user that created this briefing.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\"budget\":{\n\t\"time_goal\": \"2019-01-01-00:00.000z\",\n\t\"cost\": 1000\n},\n\"features\": [\n\t\"feature\"\n],\n\"_id\": \"5cbdce2ad66c802440ef4cbe\",\n\"cl_name\": \"Jhon Doe\",\n\"cl_phone\": \"22222222\",\n\"cl_email\": \"jhon.doe@email.com\",\n\"examples\": \"examples of the project\",\n\"num_pages\": 5,\n\"has_visual\": true,\n\"has_logo\": true,\n\"has_current\": true,\n\"description\": \"description of the project\",\n\"proj_title\": \"title\",\n\"social_media\": \"facebook, twitter,...\",\n\"outline\": \"outline of the project\",\n\"objective\": \"objective of the project\",\n\"createdBy\": \"user-id\"",
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
            "field": "Unauthorized",
            "description": "<p>The JWT token passed is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\nUnauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/briefings.js",
    "groupTitle": "Briefings"
  },
  {
    "type": "get",
    "url": "/api/briefings",
    "title": "Request a list of briefings related to the user.",
    "name": "GetBriefings",
    "group": "Briefings",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "briefings",
            "description": "<p>The list of briefings that the logged user has.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n\t{\n\t\t\"budget\":{\n\t\t\t\"time_goal\": \"2019-01-01-00:00.000z\",\n\t\t\t\"cost\": 1000\n\t\t},\n\t\t\"features\": [\n\t\t\t\"feature\"\n\t\t],\n\t\t\"_id\": \"5cbdce2ad66c802440ef4cbe\",\n\t\t\"cl_name\": \"Jhon Doe\",\n\t\t\"cl_phone\": \"22222222\",\n\t\t\"cl_email\": \"jhon.doe@email.com\",\n\t\t\"examples\": \"examples of the project\",\n\t\t\"num_pages\": 5,\n\t\t\"has_visual\": true,\n\t\t\"has_logo\": true,\n\t\t\"has_current\": true,\n\t\t\"description\": \"description of the project\",\n\t\t\"proj_title\": \"title\",\n\t\t\"social_media\": \"facebook, twitter,...\",\n\t\t\"outline\": \"outline of the project\",\n\t\t\"objective\": \"objective of the project\",\n\t\t\"createdBy\": \"user-id\"\n\t}\n]",
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
            "field": "Unauthorized",
            "description": "<p>The JWT token passed is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\nUnauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/briefings.js",
    "groupTitle": "Briefings"
  },
  {
    "type": "post",
    "url": "/api/briefings/",
    "title": "Create a briefing.",
    "name": "PostBriefing",
    "group": "Briefings",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "budget",
            "description": "<p>The information related with the project budget.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "time_goal",
            "description": "<p>The schedule of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cost",
            "description": "<p>The cost of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "features",
            "description": "<p>A list of all the features wished in the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>The briefing unique id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cl_name",
            "description": "<p>The name of the client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cl_email",
            "description": "<p>The email of the client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cl_phone",
            "description": "<p>The phone contact of the client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "examples",
            "description": "<p>Some similar projects.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "num_pages",
            "description": "<p>The number of pages that the project have.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "social_media",
            "description": "<p>If the project have any social media that can be looked over.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "has_visual",
            "description": "<p>Indicate if the project already have a design.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "has_logo",
            "description": "<p>Indicate if the project already have a logo.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "has_current",
            "description": "<p>Indicate if the project already have a current version that should be modified.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Some description of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "outline",
            "description": "<p>The outline of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "objective",
            "description": "<p>The objecive of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "createdBy",
            "description": "<p>The user that created this briefing.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FieldEmpty",
            "description": "<p>This error is sended when one or more mandatory field was not sended. This return a array with the errors.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The JWT token passed is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n[\n\t{\n\t\t\"location\": \"params\",\n\t\t\"param\": \"cl_name\",\n\t\t\"msg\": \"The client name cannot be empty.\"\n\t}\n]",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\nUnauthorized",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n\"budget\":{\n\t\"time_goal\": \"2019-01-01-00:00.000z\",\n\t\"cost\": 1000\n},\n\"features\": [\n\t\"feature\"\n],\n\"_id\": \"5cbdce2ad66c802440ef4cbe\",\n\"cl_name\": \"Jhon Doe\",\n\"cl_phone\": \"22222222\",\n\"cl_email\": \"jhon.doe@email.com\",\n\"examples\": \"examples of the project\",\n\"num_pages\": 5,\n\"has_visual\": true,\n\"has_logo\": true,\n\"has_current\": true,\n\"description\": \"description of the project\",\n\"proj_title\": \"title\",\n\"social_media\": \"facebook, twitter,...\",\n\"outline\": \"outline of the project\",\n\"objective\": \"objective of the project\",\n\"createdBy\": \"user-id\"",
          "type": "json"
        }
      ]
    },
    "filename": "routes/briefings.js",
    "groupTitle": "Briefings"
  },
  {
    "type": "put",
    "url": "/api/briefings/update",
    "title": "Update the briefing with the data.",
    "name": "PutBriefing",
    "group": "Briefings",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "budget",
            "description": "<p>The information related with the project budget.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "time_goal",
            "description": "<p>The schedule of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "cost",
            "description": "<p>The cost of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "features",
            "description": "<p>A list of all the features wished in the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>The briefing unique id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "cl_name",
            "description": "<p>The name of the client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "cl_email",
            "description": "<p>The email of the client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "cl_phone",
            "description": "<p>The phone contact of the client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "examples",
            "description": "<p>Some similar projects.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "num_pages",
            "description": "<p>The number of pages that the project have.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "social_media",
            "description": "<p>If the project have any social media that can be looked over.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "has_visual",
            "description": "<p>Indicate if the project already have a design.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "has_logo",
            "description": "<p>Indicate if the project already have a logo.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "has_current",
            "description": "<p>Indicate if the project already have a current version that should be modified.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Some description of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "outline",
            "description": "<p>The outline of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "objective",
            "description": "<p>The objecive of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>The user that created this briefing.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FieldEmpty",
            "description": "<p>This error is sended when one or more mandatory field was not sended. This return a array with the errors.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The JWT token passed is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n[\n\t{\n\t\t\"location\": \"params\",\n\t\t\"param\": \"_id\",\n\t\t\"msg\": \"You need to pass the briefing id.\"\n\t}\n]",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\nUnauthorized",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 202 Accepted\n\"budget\":{\n\t\"time_goal\": \"2019-01-01-00:00.000z\",\n\t\"cost\": 1000\n},\n\"features\": [\n\t\"feature\"\n],\n\"_id\": \"5cbdce2ad66c802440ef4cbe\",\n\"cl_name\": \"Jhon Doe\",\n\"cl_phone\": \"22222222\",\n\"cl_email\": \"jhon.doe@email.com\",\n\"examples\": \"examples of the project\",\n\"num_pages\": 5,\n\"has_visual\": true,\n\"has_logo\": true,\n\"has_current\": true,\n\"description\": \"description of the project\",\n\"proj_title\": \"title\",\n\"social_media\": \"facebook, twitter,...\",\n\"outline\": \"outline of the project\",\n\"objective\": \"objective of the project\",\n\"createdBy\": \"user-id\"",
          "type": "json"
        }
      ]
    },
    "filename": "routes/briefings.js",
    "groupTitle": "Briefings"
  },
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
            "description": "<p>This error is sended when one or more mandatory field was not sended. This return a array with the errors.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmailAlreadyExists",
            "description": "<p>Indicates that the email already exists on database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n[\n\t{\n\t\t\"location\": \"params\",\n\t\t\"param\": \"name\",\n\t\t\"msg\": \"The field name cannot be empty.\"\n\t}\n]",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n\t\"error\": \"EmailAlreadyExists\"\n}",
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
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
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
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The JWT token passed is invalid.</p>"
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
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\nUnauthorized",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  }
] });
