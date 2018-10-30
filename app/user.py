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

    def create_financial_department(self, fd_username, fd_password):
        if self.company.Financial_Department != null:
            raise Exception("FD already exists for this company!")
        self.company.Financial_Department = Financial_Department(fd_username, fd_password)
    def create_department(self, dpt_name, dpt_username, dpt_password):
        for dpt in self.company.department_list:
            if dpt_name == dpt.name:
                raise Exception("This Department already exists in this company!")
        d = Deparment_head(dpt_name, dpt_username, dpt_password)
        self.company.department_list.append(d)


class FinancialDepartmentHead(User):
    pass


class DepartmentHead(User):

    def __init__(self, name, username, password, company):
        super().__init__(username, password, company)
        self.name = name
        
        
    def submit_request(amount, text):
        #create a request here
        request = []
        if !(amount > self.company.threshold): # company needs threshold field
            self.company.Financial_Department.requests.append(request) # FD needs request array
        else:
            self.company.CEO.dep_req.append(request) # CEO needs another request array to handle the requests exceeding threshold
        return 0 #maybe for error checking?        
