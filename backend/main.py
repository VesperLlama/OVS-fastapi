import os
import jwt
from dotenv import load_dotenv
from fastapi import FastAPI
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
from models.electionSchema import registerSchema, loginSchema, voteSchema
from createCollections import create_users_collection, create_parties_collection


app = FastAPI()
load_dotenv()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


client = MongoClient(os.getenv('DB_URL'))
db = client["electionDB"]

if "users" not in db.list_collection_names() or "parties" not in db.list_collection_names():
    create_users_collection(db)
    create_parties_collection(db)

collection = db["users"]
pCollection = db["parties"]

secret = os.getenv('key')


@app.post("/register")
def register(data: registerSchema):
    existing_user = collection.find_one(
        {"aadharNo": data.aadharNo}, {'_id': 0})
    if existing_user:
        return {"message": "User already exists"}

    user_dict = data.dict()
    collection.insert_one(user_dict)


@app.post("/login")
def login(data: loginSchema):
    user = collection.find_one(
        {"aadharNo": data.aadharNo, "password": data.password})
    if not user:
        return {"message": "User does not exist."}
    else:
        token = jwt.encode({"aadharNo": data.aadharNo},
                           secret, algorithm="HS256")
        return {'token': token}


@app.post("/recordVote")
def recordVote(data: voteSchema):
    user = collection.find_one({"aadharNo": data.aadharNo})
    token = None
    try:
        token = jwt.decode(data.token, secret, algorithms="HS256")
    except:
        return {"error": "Authorisation Failed"}
    else:
        if not user["voteStatus"]:
            collection.find_one_and_update({"aadharNo": data.aadharNo}, {
                "$set": {"voteStatus": True}})
            pCollection.find_one_and_update(
                {"name": data.party}, {"$inc": {"votes": 1}})
        else:
            return {"message": "Already voted"}


@app.get("/home")
def home():
    total = collection.count_documents({"voteStatus": True})

    bjp = pCollection.find_one({"name": "bjp"}, {'_id': 0})
    congress = pCollection.find_one({"name": "congress"}, {'_id': 0})
    aap = pCollection.find_one({"name": "aap"}, {'_id': 0})
    ncp = pCollection.find_one({"name": "ncp"}, {'_id': 0})
    inld = pCollection.find_one({"name": "inld"}, {'_id': 0})

    data = {"total": total, "bjp": bjp["votes"], "congress": congress["votes"],
            "aap": aap["votes"], "ncp": ncp["votes"], "inld": inld["votes"]}
    return data
