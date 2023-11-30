from pydantic import BaseModel


class registerSchema(BaseModel):
    name: str
    password: str
    mobileNo: str
    aadharNo: str
    voteStatus: bool = False


class loginSchema(BaseModel):
    aadharNo: str
    password: str


class voteSchema(BaseModel):
    aadharNo: str
    party: str
    token: str
