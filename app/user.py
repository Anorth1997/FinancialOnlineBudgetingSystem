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

    def __init__(self, username, password, company, name):
	super().__init__(self, username, password, company)
	self.name = name
	self.dep_req = [] # department requests exceeding threshold: cannot be handled by FD

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

    def set_total_revenue(self, company, tr):
        company.set_revenue(tr)


class FinancialDepartmentHead(User):

    def __init__(self, name, username, password, company):
	super().__init__(username, password, company)
	self.name = name
	self.budget_requests = []

    def new_head_incoming(new_name):
	self,name = new_name

    def distribute_total_revenue(self, expected_revenue_set):  ## modifies the expected_revenue for each department
        """

        :param expected_revenue_set: dictionary {DepartmentHead.name: int}
        :return: None
        """
	for dpt in expected_revenue_set:
	    if dpt not in self.company.departments:
		raise Exception("FD trying to set revenue for a department which does not exist")
	    dpt.budget = expected_revenue_set.get(dpt)
        return None

    def review_budget_request():
	for item in this.budget_requests:
	    print("Department: %s, Budget demanded: %d, Reason: %s".format(budget_request[0], budget_request[1], budget_request[2])) #prints the amount required by the department as 
																     #well as reason for it. 
	    response = input("0 for decline, 1 for approve.")
	    # figure out how to set budget

class DepartmentHead(User):

    def __init__(self, name, dptname, username, password, company):
        super().__init__(username, password, company)
	self.dptname = dptname
        self.name = name
        self.expected_revenue = 0
        self.budget = 0
        self.requests = []
        
    def submit_request(amount, text):
        #create a request here
        request = []
	request[0] = dptname
	request[1] = input("Amount to request: ")
	request[2] = input("Reason(s) for this request: ")
        if !(amount > self.company.threshold): # company needs threshold field
            self.company.Financial_Department.requests.append(request) # FD needs request array
        else:
            self.company.CEO.dep_req.append(request) # CEO needs another request array to handle the requests exceeding threshold
        return 0 #maybe for error checking?

    def throw_out_request(request):
	# if we decide we don't want it anymore?
	pass


    def set_expected_budget(self):
        pass

    def view_department_history(self):
        pass
