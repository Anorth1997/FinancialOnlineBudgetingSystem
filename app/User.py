from flask_login import UserMixin
from passlib.context import CryptContext
import db

pwd_context = CryptContext(
    schemes=["pbkdf2_sha256"],
    default="pbkdf2_sha256",
    pbkdf2_sha256__default_rounds=30000
)

def encrypt_password(password):
    return pwd_context.encrypt(password)

# Compare the user-provided password with the password stored in the database
def check_encrypted_password(password, hashed):
    return pwd_context.verify(password, hashed)

class User(UserMixin, db.Model):

    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(64), unique=True, index=True)
    username = db.Column(db.String(64), unique=True, index=True)
    password_hash = db.Column(db.String(128))

    def __init__(self, username, password, company):
        self.username = username
        self.password = password
        self.company = company
    
    @password.setter
    def password(self, password):
        self.password_hash = encrypt_password(password)



class CEO(User):
    def create_department(self, dpt_username, dpt_password):

class FinancialDepartmentHead(User):

class DepartmentHead(User):
    