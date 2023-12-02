def create_users_collection(db):
    try:
        db.create_collection("users")
    except Exception as e:
        print(e)

    user_validator = {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["name", "password", "mobileNo", "aadharNo"],
            "properties": {
                "name": {
                    "bsonType": "string",
                    "description": "'name' must be a string and is required"
                },
                "password": {
                    "bsonType": "string",
                    "description": "'password' must be a string of minimum 8 characters and is required",
                    "minimum": 8
                },
                "mobileNo": {
                    "bsonType": "string",
                    "description": "'mobileNo' must be a string of 10 characters and is required",
                    "minimum": 10
                },
                "aadharNo": {
                    "bsonType": "string",
                    "description": "'aadharNo' must be a string of 12 characters and is required",
                    "minimum": 12
                },
                "voteStatus": {
                    "bsonType": "bool",
                    "description": "'voteStatus is a boolean and it is false by default",
                }
            }
        }
    }

    db.command("collMod", "users", validator=user_validator)


def create_parties_collection(db):
    try:
        db.create_collection("parties")
    except Exception as e:
        print(e)

    parties_validator = {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["name", "votes"],
            "properties": {
                "name": {
                    "bsonType": "string",
                    "description": "'name' must be a string and is required"
                },
                "votes": {
                    "bsonType": "int",
                    "description": "'votes' must be an int and is required",
                    "minimum": 0
                }
            }
        }
    }

    db.command("collMod", "parties", validator=parties_validator)
