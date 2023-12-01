from pydantic import BaseModel, Field


class registerSchema(BaseModel):
    name: str
    password: str = Field(min_length=8)
    mobileNo: str = Field(min_length=10, max_length=10)
    aadharNo: str = Field(min_length=12, max_length=12)
    voteStatus: bool = Field(default=False)


class loginSchema(BaseModel):
    aadharNo: str = Field(min_length=12, max_length=12)
    password: str = Field(min_length=8)


class voteSchema(BaseModel):
    aadharNo: str = Field(min_length=12, max_length=12)
    party: str
    token: str
